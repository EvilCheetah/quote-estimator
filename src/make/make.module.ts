import { Module } from '@nestjs/common';
import { MakeService } from './make.service';
import { MakeController } from './make.controller';


@Module({
    controllers: [MakeController],
    providers:   [MakeService]
})
export class MakeModule {}
