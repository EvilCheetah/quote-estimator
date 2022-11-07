import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { NewUserDTO } from '@common/dto';
import { GetUser, IgnoreDefaultGuard, Public, User } from '@common/decorator';
import { JwtTokens } from '@common/interface';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard, LocalAuthGuard } from '@common/guard';
import { ValidatedUser } from '@common/types';


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
        @GetUser('sub', ParseIntPipe)
        user_id: number,

        @GetUser('refresh_token')
        refresh_token: string
    ): Promise<JwtTokens>
    {
        return this.authService.refresh(user_id, refresh_token);
    }
}
