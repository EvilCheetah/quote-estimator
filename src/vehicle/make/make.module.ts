import { Global, Module } from '@nestjs/common';
import { MakeService } from './make.service';
import { MakeController } from './make.controller';

@Global()
@Module({
    controllers: [MakeController],
    providers:   [MakeService],
    exports:     [MakeModule]
})
export class MakeModule {}
