import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';


@Module({
    imports: [
        UsersModule,
        PassportModule,

        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: { 
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN')
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers:   [AuthService]
})
export class AuthModule {}
