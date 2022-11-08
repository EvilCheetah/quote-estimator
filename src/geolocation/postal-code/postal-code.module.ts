import { Module } from '@nestjs/common';
import { PostalCodeService } from './postal-code.service';
import { PostalCodeController } from './postal-code.controller';

@Module({
  controllers: [PostalCodeController],
  providers: [PostalCodeService]
})
export class PostalCodeModule {}
