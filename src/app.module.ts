import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { JwtAuthGuard } from '@guard';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { GeolocationModule } from './geolocation/geolocation.module';


@Module({
    imports: [
        /// Library Imports
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,

        /// Auth Imports
        UsersModule,
        AuthModule,

        /// Services Imports
        VehicleModule,
        GeolocationModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: JwtAuthGuard }
    ]
})
export class AppModule {}
