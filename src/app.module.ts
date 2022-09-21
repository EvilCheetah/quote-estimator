import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleMakeModule } from './vehicle-make/vehicle-make.module';


@Module({
    imports: [
        PrismaModule,
        VehicleMakeModule
    ]
})
export class AppModule {}
