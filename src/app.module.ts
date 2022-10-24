import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,

        VehicleModule,
        GeolocationModule,
        UsersModule,
    ]
})
export class AppModule {}
