import { Module } from '@nestjs/common';
import { QuoteVariablesService } from './quote-variables.service';
import { QuoteVariablesController } from './quote-variables.controller';


@Module({
    controllers: [QuoteVariablesController],
    providers:   [QuoteVariablesService],
    exports:     [QuoteVariablesService]
})
export class QuoteVariablesModule {}