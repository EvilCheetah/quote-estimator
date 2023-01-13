import { Module } from '@nestjs/common';
import { QuoteGeneratorModule } from './generator/quote-generator.module';
import { QuoteVariablesModule } from './variables/quote-variables.module';


@Module({
    imports: [
        QuoteGeneratorModule, 
        QuoteVariablesModule
    ],
})
export class QuoteModule {}