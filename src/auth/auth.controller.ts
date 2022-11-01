import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@common/decorator';
import { AccessToken } from '@common/interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { NewUserDTO } from '@common/dto';


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
    logout()
    {
        this.authService.logout();
    }

    @Post('refresh')
    refresh()
    {
        this.authService.refresh();
    }
}
