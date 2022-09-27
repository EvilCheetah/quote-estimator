import { Global, Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Global()
@Module({
    controllers: [ModelController],
    providers:   [ModelService]
})
export class ModelModule {}
