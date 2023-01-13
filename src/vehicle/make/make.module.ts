import { Module } from '@nestjs/common';
import { MakeService } from './make.service';
import { MakeController } from './make.controller';
import { ModelModule } from '../model/model.module';


@Module({
    controllers: [MakeController],
    providers:   [MakeService],
    exports:     [MakeService]
})
export class MakeModule {}
