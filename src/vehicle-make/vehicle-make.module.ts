import { Module } from '@nestjs/common';
import { VehicleMakeService } from './vehicle-make.service';
import { VehicleMakeController } from './vehicle-make.controller';


@Module({
    controllers: [VehicleMakeController],
    providers:   [VehicleMakeService]
})
export class VehicleMakeModule {}
