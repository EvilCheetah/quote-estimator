import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { NewUserDTO } from '@dto';
import { JwtTokens } from '@interface';
import { AuthService } from './auth.service';
import { ValidatedUser } from '@types';
import { JwtRefreshAuthGuard, LocalAuthGuard } from '@guard';
import { GetUser, IgnoreDefaultGuard, Public, User } from '@decorator';


@Controller('auth')
export class AuthController
{
    constructor(
        private readonly authService: AuthService
    ) {}


    @Public()
    @Post('signup')
    signup(
        @Body()
        new_user: NewUserDTO
    ): Promise<JwtTokens>
    {
        return this.authService.signup(new_user);
    }


    @Post('login')
    @IgnoreDefaultGuard()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(
        @User()
        user: ValidatedUser
    ): Promise<JwtTokens>
    {
        return this.authService.login( user );
    }


    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(
        @GetUser('sub')
        user_id: number
    )
    {
        return this.authService.logout(user_id);
    }


    @Post('refresh')
    @IgnoreDefaultGuard()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtRefreshAuthGuard)
    refresh(
        @User()
        user: ValidatedUser,
    ): Promise<JwtTokens>
    {
        return this.authService.refresh(user);
    }
}
