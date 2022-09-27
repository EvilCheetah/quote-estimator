import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';


@Module({
    imports: [
        PrismaModule,
        VehicleModule
    ]
})
export class AppModule {}
