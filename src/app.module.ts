import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    ]
})
export class AppModule {}
