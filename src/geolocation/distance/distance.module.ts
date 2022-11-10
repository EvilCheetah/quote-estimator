import { Module } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { DistanceController } from './distance.controller';

@Module({
  controllers: [DistanceController],
  providers: [DistanceService]
})
export class DistanceModule {}
