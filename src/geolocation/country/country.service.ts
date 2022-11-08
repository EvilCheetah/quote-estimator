import { Injectable, NotFoundException } from '@nestjs/common';

import { Country } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDTO } from './dto/create-country.dto';
import { UpdateCountryDTO } from './dto/update-country.dto';


@Injectable()
export class CountryService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createCountryDTO: CreateCountryDTO): Promise<Country>
    {
        return this.prisma.country.create({
            data: createCountryDTO
        })
    }

    findAll(): Promise<Country[]>
    {
        return this.prisma.country.findMany();
    }

    async findOne(country_id: number): Promise<Country>
    {
        const country = await this.prisma.country.findUnique({
            where: { country_id }
        });

        if ( !country )
            throw new NotFoundException(`Country with id: ${country_id} was NOT FOUND`);
        
        return country;
    }

    async update(country_id: number, updateCountryDTO: UpdateCountryDTO): Promise<Country>
    {
        const country = await this.findOne(country_id);

        return this.prisma.country.update({
            where: { country_id: country.country_id },
            data:    updateCountryDTO
        });
    }

    async remove(country_id: number): Promise<Country>
    {
        const country = await this.findOne(country_id);

        return this.prisma.country.delete({
            where: { country_id: country.country_id }
        });
    }
}