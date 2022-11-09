import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { Public } from '@decorator';
import { Country } from '@prisma/client';
import { CountryService } from './country.service';
import { CreateCountryDTO } from './dto/create-country.dto';
import { UpdateCountryDTO } from './dto/update-country.dto';


@Controller('country')
export class CountryController
{
    constructor(
        private readonly countryService: CountryService
    ) {}

    @Post()
    create(
        @Body()
        createCountryDTO: CreateCountryDTO
    ): Promise<Country>
    {
        return this.countryService.create(createCountryDTO);
    }


    @Get()
    findAll(): Promise<Country[]>
    {
        return this.countryService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe)
        country_id: number
    ): Promise<Country>
    {
        console.log(country_id)

        return this.countryService.findOne(country_id);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        country_id: number,
        
        @Body()
        updateCountryDTO: UpdateCountryDTO
    ): Promise<Country>
    {
        return this.countryService.update(country_id, updateCountryDTO);
    }

    
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe)
        country_id: number
    ): Promise<Country>
    {
        return this.countryService.remove(country_id);
    }
}