import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { MakeModule } from './vehicle/make/make.module';
import { ModelModule } from './vehicle/model/model.module';
import { VehicleModule } from './vehicle/vehicle.module';


@Module({
    imports: [
        PrismaModule,
        VehicleModule
        // MakeModule,
        // ModelModule
    ]
})
export class AppModule {}
