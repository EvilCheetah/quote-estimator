import { Body, Controller, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { NewUserDTO } from '@common/dto';
import { GetUser, Public, User } from '@common/decorator';
import { JwtTokens } from '@common/interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtRefreshAuthGuard } from '@common/guard';


@Controller('auth')
export class AuthController
{
    constructor(
        private readonly authService: AuthService
    ) {}


    @Post('signup')
    signup(
        @Body()
        new_user: NewUserDTO
    ): Promise<JwtTokens>
    {
        return this.authService.signup(new_user);
    }


    @Public()
    @Post('login')
    login(
        @User()
        credential: AuthCredentialsDTO
    ): Promise<JwtTokens>
    {
        return this.authService.login( credential );
    }


    @Post('logout')
    logout(
        @GetUser('sub', ParseIntPipe)
        user_id: number
    )
    {
        return this.authService.logout(user_id);
    }

    
    @Public()
    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    refresh(
        @GetUser('sub', ParseIntPipe)
        user_id: number,

        @GetUser('refresh_token')
        refresh_token: string
    ): Promise<JwtTokens>
    {
        return this.authService.refresh(user_id, refresh_token);
    }
}
