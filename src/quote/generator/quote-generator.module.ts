import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { QuoteVariablesModule } from '../variables/quote-variables.module';
import { QuoteGeneratorService } from './quote-generator.service';
import { QuoteGeneratorController } from './quote-generator.controller';


@Module({
    imports: [
        HttpModule,
        QuoteVariablesModule
    ],
    controllers: [QuoteGeneratorController],
    providers:   [QuoteGeneratorService]
})
export class QuoteGeneratorModule {}
