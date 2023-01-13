import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { QuoteVariablesDTO } from './dto/quote-values.dto';


@Injectable()
export class QuoteVariablesService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}


    create(quote_variables: QuoteVariablesDTO)
    {
        return this.prisma.quoteVariable.create({
            data: quote_variables
        })
    }


    find_all()
    {
        return this.prisma.quoteVariable.findMany();
    }


    async find_one(quote_variable_id: number)
    {
        const quote_variables = await this.prisma.quoteVariable.findUnique({
            where: { quote_variable_id }
        });

        if ( !quote_variables )
            throw new NotFoundException(`Quote with id: '${quote_variable_id}' was NOT FOUND`);
        
        return quote_variables;
    }


    get_current()
    {
        return this.prisma.quoteVariable.findFirst({
            orderBy: { created_at: 'asc' },
            take: -1
        });
    }


    async update(quote_variable_id: number, quote_variables: QuoteVariablesDTO)
    {
        const variables = await this.find_one(quote_variable_id);

        return this.prisma.quoteVariable.update({
            where: { quote_variable_id: variables.quote_variable_id },
            data:  {
                ...variables,
                ...quote_variables
            }
        });
    }


    async remove(quote_variable_id: number)
    {
        const variables = await this.find_one(quote_variable_id);

        return this.prisma.quoteVariable.delete({
            where: { quote_variable_id: variables.quote_variable_id }
        })
    }
}
