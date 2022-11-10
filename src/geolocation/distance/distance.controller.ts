import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { CreateDistanceDTO } from './dto/create-distance.dto';


@Controller('distance-edge')
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


    @Get('all')
    findAll()
    {
        return this.distanceService.findAll();
    }


    @Get()
    findOne(
        @Body()
        distanceDTO: CreateDistanceDTO
    )
    {
        return this.distanceService.findOne(distanceDTO);
    }


    @Patch()
    update(
        @Body()
        updateDistanceDTO: CreateDistanceDTO
    )
    {
        return this.distanceService.update(updateDistanceDTO);
    }


    @Delete()
    remove(
        @Body()
        distanceDTO: CreateDistanceDTO
    )
    {
        return this.distanceService.remove(distanceDTO);
    }
}
