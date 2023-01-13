import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetQuoteDTO } from './dto/get-quote.dto';
import { QuoteGeneratorService } from './quote-generator.service';


@Controller('quote')
export class QuoteGeneratorController
{
    constructor(
        private readonly generatorService: QuoteGeneratorService
    ) {}

    @Post()
    create(
        @Body()
        quote_data: GetQuoteDTO
    )
    {
        return this.generatorService.create(quote_data);
    }

    @Get()
    find_all()
    {
        return this.generatorService.find_all();
    }

    @Get(':id')
    find_one(
        @Param('id')
        quote_id: string
    )
    {
        return this.generatorService.find_one(quote_id);
    }

    @Patch(':id')
    update(
        @Param('id')
        quote_id: string,

        @Body()
        quote_data: GetQuoteDTO
    )
    {
        return this.generatorService.update(quote_id, quote_data);
    }

    @Delete(':id')
    remove(
        @Param('id')
        quote_id: string
    )
    {
        return this.generatorService.remove(quote_id);
    }
}