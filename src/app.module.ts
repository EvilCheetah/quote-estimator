import { Module } from '@nestjs/common';
import { MakeModule } from './make/make.module';


@Module({
    imports:     [MakeModule],
    controllers: [],
    providers:   [],
})
export class AppModule {}
