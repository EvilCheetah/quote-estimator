import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Controller('city')
export class CityController
{
    constructor(private readonly cityService: CityService) {}

    @Post()
    create(
        @Body()
        createCityDTO: CreateCityDTO
    )
    {
        return this.cityService.create(createCityDTO);
    }

    @Get()
    findAll()
    {
        return this.cityService.findAll();
    }

    @Get(':city_id')
    findOne(
        @Param('city_id', ParseIntPipe)
        city_id: number
    )
    {
        return this.cityService.findOne(city_id);
    }

    @Patch(':city_id')
    update(
        @Param('city_id', ParseIntPipe)
        city_id: number,
        
        @Body()
        updateCityDTO: UpdateCityDTO
    )
    {
        return this.cityService.update(city_id, updateCityDTO);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe)
        city_id: number
    )
    {
        return this.cityService.remove(city_id);
    }
}
