import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { CreateDistanceDTO } from './dto/create-distance.dto';
import { UpdateDistanceDTO } from './dto/update-distance.dto';

@Controller('distance')
export class DistanceController
{
    constructor(
        private readonly distanceService: DistanceService
    ) {}


    @Post()
    create(
        @Body()
        createDistanceDTO: CreateDistanceDTO
    )
    {
        return this.distanceService.create(createDistanceDTO);
    }


    @Get()
    findAll()
    {
        return this.distanceService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe)
        distance_id: number
    )
    {
        return this.distanceService.findOne(distance_id);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        distance_id: number,

        @Body()
        updateDistanceDTO: UpdateDistanceDTO
    )
    {
        return this.distanceService.update(distance_id, updateDistanceDTO);
    }


    @Delete(':id')
    remove(
        @Param('id')
        distance_id: number 
    )
    {
        return this.distanceService.remove(distance_id);
    }
}
