import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';


@Module({
    imports: [
        UsersModule,
        PassportModule,

        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers:   [
        AuthService,

        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy
    ]
})
export class AuthModule {}
