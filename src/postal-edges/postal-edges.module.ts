import { Module } from '@nestjs/common';
import { PostalEdgesService } from './postal-edges.service';
import { PostalEdgesController } from './postal-edges.controller';

@Module({
  controllers: [PostalEdgesController],
  providers: [PostalEdgesService]
})
export class PostalEdgesModule {}
