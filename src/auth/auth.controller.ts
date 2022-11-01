import { Controller, Post } from '@nestjs/common';

import { User } from '@common/decorator';
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
    signup()
    {
        this.authService.signup();
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
