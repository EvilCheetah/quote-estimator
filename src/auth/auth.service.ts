import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotAcceptableException } from '@nestjs/common';

import { User } from '@prisma/client';
import { NewUserDTO } from '@dto';
import { ValidatedUser } from '@types';
import { JwtTokens, JwtPayload } from '@interface';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService
{
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService:    JwtService,
        private readonly usersService:  UsersService,
    ) {}

    /// -------------------------- Validation Methods -------------------------- ///
    async validateCredentials(email: string, passwd: string): Promise<ValidatedUser>
    {
        const user             = await this.usersService.findOneByEmail(email),
              password_matches = await bcrypt.compare(passwd, user.password);

        if ( !(user && password_matches) )
            return null;
        
        const { password, ...user_info } = user;

        return user_info;
    }

    async validateRefreshToken(user_id: number, refresh: string): Promise<ValidatedUser>
    {
        const user             = await this.usersService.findOneById(user_id);

        if ( !( user && user.refresh_token ) )
            return null;

        const refresh_is_valid = await argon2.verify(user.refresh_token, refresh);
        
        if ( !refresh_is_valid )
            return null;
        
        const { password, refresh_token, ...user_info } = user;

        return user_info;
    }

    /// -------------------------- Controller Called Methods -------------------------- ///
    async signup(new_user: NewUserDTO): Promise<JwtTokens>
    {
        const user   = await this.usersService.create(new_user);
        
        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token);

        return tokens;
    }

    async login(user: ValidatedUser): Promise<JwtTokens>
    {
        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token)

        return tokens;
    }

    async logout(user_id: number)
    {
        await this.usersService.resetRefreshToken(user_id);

        return { message: 'Successfully logged out' };
    }

    async refresh(user: ValidatedUser): Promise<JwtTokens>
    {
        const tokens = this.getTokens({ sub: user.user_id, email: user.email });
        await this.usersService.updateRefreshToken(user.user_id, tokens.refresh_token);

        return tokens;
    }

    /// -------------------------- Helper Methods -------------------------- ///
    getTokens(payload: JwtPayload): JwtTokens
    {
        const access_token  = this.jwtService.sign(
            payload, 
            { 
                secret:    this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN')
            }
        );
        
        const refresh_token = this.jwtService.sign(
            payload, 
            { 
                secret:    this.configService.get('JWT_REFRESH_TOKEN_SECRET'), 
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN')
            }
        );
        
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
