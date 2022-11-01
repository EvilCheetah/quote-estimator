import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';


@Module({
    imports: [
        UsersModule,
        PassportModule,

        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers:   [AuthService]
})
export class AuthModule {}
