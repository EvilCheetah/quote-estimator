import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';
import { JwtTokens } from '@common/interface';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { NewUserDTO } from '@common/dto';
import { JwtPayload } from '@common/interface/jwt-payload.interface';


@Injectable()
export class AuthService
{
    constructor(
        private readonly jwtService:   JwtService,
        private readonly usersService: UsersService,
    ) {}

    async validate(email: string, passwd: string): Promise< Partial<User> | null >
    {
        const user             = await this.usersService.findOneByEmail(email),
              password_matches = await bcrypt.compare(user.password, passwd);

        if ( !(user && password_matches) )
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
        const user = await this.validate(credentials.email, credentials.password)

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

    refresh()
    {
        return `This action refreshes`;
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
