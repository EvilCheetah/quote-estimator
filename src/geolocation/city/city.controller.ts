import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Controller('city')
export class CityController
{
    constructor(private readonly cityService: CityService) {}

    @Post()
    create(@Body() createCityDTO: CreateCityDTO)
    {
        return this.cityService.create(createCityDTO);
    }

    @Get()
    findAll()
    {
        return this.cityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.cityService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCityDTO: UpdateCityDTO)
    {
        return this.cityService.update(+id, updateCityDTO);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.cityService.remove(+id);
    }
}
