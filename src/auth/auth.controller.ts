import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';

import { NewUserDTO } from '@common/dto';
import { GetUser, User } from '@common/decorator';
import { AccessToken } from '@common/interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';


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
    )
    {
        this.authService.signup(new_user);
    }

    @Post('login')
    login(
        @User()
        credential: AuthCredentialsDTO
    ): any
    {
        return this.authService.login( credential );
    }

    @Post('logout')
    logout(
        @GetUser('sub', ParseIntPipe)
        user_id: string
    )
    {
        this.authService.logout(+user_id);
    }

    @Post('refresh')
    refresh(
        @GetUser('sub', ParseIntPipe)
        user_id: string,

        @GetUser('refresh_token')
        refresh_token: string
    )
    {
        this.authService.refresh(+user_id, refresh_token);
    }
}
