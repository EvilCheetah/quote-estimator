import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuoteVariablesDTO } from './dto/quote-values.dto';
import { QuoteVariablesService } from './quote-variables.service';


@Controller('quote/variables')
export class QuoteVariablesController
{
    constructor(
        private readonly quoteVariablesService: QuoteVariablesService
    ) {}


    @Post()
    create(
        @Body()
        quote_variables: QuoteVariablesDTO
    )
    {
        return this.quoteVariablesService.create(quote_variables);
    }


    @Get()
    find_all()
    {
        return this.quoteVariablesService.find_all();
    }


    @Get(':id')
    find_one(
        @Param('id', ParseIntPipe)
        quote_variable_id: number
    )
    {
        return this.quoteVariablesService.find_one(quote_variable_id);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        quote_variable_id: number,
        
        @Body()
        quote_variables: QuoteVariablesDTO
    )
    {
        return this.quoteVariablesService.update(quote_variable_id, quote_variables);
    }

    
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe)
        quote_variable_id: number
    )
    {
        return this.quoteVariablesService.remove(quote_variable_id);
    }
}
