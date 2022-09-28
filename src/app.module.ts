import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { GeolocationModule } from './geolocation/geolocation.module';


@Module({
    imports: [
        PrismaModule,
        VehicleModule,
        GeolocationModule,
    ]
})
export class AppModule {}
