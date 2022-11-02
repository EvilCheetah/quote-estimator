import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { NewUserDTO } from '@common/dto';
import { ValidatedUser } from '@common/types';
import { JwtTokens, JwtPayload } from '@common/interface';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';


@Injectable()
export class AuthService
{
    constructor(
        private readonly jwtService:   JwtService,
        private readonly usersService: UsersService,
    ) {}

    async validateCredentials(email: string, passwd: string): Promise<ValidatedUser>
    {
        const user             = await this.usersService.findOneByEmail(email),
              password_matches = await bcrypt.compare(user.password, passwd);

        if ( !(user && password_matches) )
            return null;
        
        const { password, ...user_info } = user;

        return user_info;
    }

    async validateRefreshToken(user_id: number, refresh_token: string): Promise<ValidatedUser>
    {
        const user             = await this.usersService.findOneById(user_id),
              refresh_is_valid = await bcrypt.compare(refresh_token, user.refresh_token);
        
        if ( !(user && refresh_is_valid) )
            return null;
        
        const { password, ...user_info } = user;

        return user_info;
    }

    async signup(new_user: NewUserDTO): Promise<JwtTokens>
    {
        const user   = await this.usersService.create(new_user);
        
        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token);

        return tokens;
    }

    async login(credentials: AuthCredentialsDTO): Promise<JwtTokens>
    {
        const user = await this.validateCredentials(credentials.email, credentials.password)

        if ( !user )
            throw new UnauthorizedException();

        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token)

        return tokens;
    }

    logout(user_id: number)
    {
        this.usersService.resetRefreshToken(user_id);
    }

    async refresh(user_id: number, refresh_token: string): Promise<JwtTokens>
    {
        const user = await this.validateRefreshToken(user_id, refresh_token);

        if ( !user )
            throw new UnauthorizedException();
        
        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token);

        return tokens;
    }

    getTokens(payload: JwtPayload): JwtTokens
    {
        const access_token  = this.jwtService.sign(payload),
              refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' });
        
        return { access_token, refresh_token };
    }

    /// --------------- Currently Not in User --------------- ///
    async verify(token: string): Promise<User>
    {
        const decoded = this.jwtService.verify(token);
        const user    = this.usersService.findOneByEmail(decoded.email);

        if ( !user )
            throw new NotAcceptableException('Unable to decode user data from provided token');
        
        return user;
    }
}
