import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { query } from 'express';

import { PostalCodeInCityDTO } from './dto/postal-code-in-city.dto';
import { PostalCodeInCityQuery } from './dto/postal-code-in-city.query';
import { PostalCodeInCityService } from './postal-code-in-city.service';


@Controller('postal-code-in-city')
export class PostalCodeInCityController
{
    constructor(
        private readonly postalEdgesService: PostalCodeInCityService
    ) {}


    @Post()
    create(
        @Body()
        postalEdgeDTO: PostalCodeInCityDTO
    )
    {
        return this.postalEdgesService.create(postalEdgeDTO);
    }


    @Get([
        '/city/:city_id/postal-code/:postal_code_id',
        '/postal-code/:postal_code_id/city/:city_id'
    ])
    find_one(
        @Param('city_id', ParseIntPipe)
        city_id: number,

        @Param('postal_code_id', ParseIntPipe)
        postal_code_id: number
    )
    {
        return this.postalEdgesService.find_one(city_id, postal_code_id);
    }


    @Get()
    findAll(
        @Query()
        query: PostalCodeInCityQuery
    )
    {
        return this.postalEdgesService.find_all(query);
    }

    @Get('suggest')
    suggest(
        @Query('suggestion')
        suggest: string
    )
    {
        return this.postalEdgesService.suggest(suggest);
    }

    @Delete()
    remove(
        @Query()
        query: PostalCodeInCityQuery
    )
    {
        return this.postalEdgesService.remove(query);
    }
}
