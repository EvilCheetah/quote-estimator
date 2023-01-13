import { Module } from '@nestjs/common';
import { PostalCodeInCityService } from './postal-code-in-city.service';
import { PostalCodeInCityController } from './postal-code-in-city.controller';

@Module({
  controllers: [PostalCodeInCityController],
  providers:   [PostalCodeInCityService]
})
export class PostalCodeInCityModule {}
