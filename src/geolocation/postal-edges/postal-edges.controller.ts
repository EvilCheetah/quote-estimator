import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PostalEdge } from 'src/common/types/postal-edge.type';

import { PostalEdgeDTO } from './dto/postal-edge.dto';
import { PostalEdgesService } from './postal-edges.service';


@Controller('postal-edges')
export class PostalEdgesController
{
    constructor(
        private readonly postalEdgesService: PostalEdgesService
    ) {}


    @Post()
    create(
        @Body()
        postalEdgeDTO: PostalEdgeDTO
    )
    {
        return this.postalEdgesService.create(postalEdgeDTO);
    }


    @Get()
    findAll()
    {
        return this.postalEdgesService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('origin',      ParseIntPipe)
        origin: number,

        @Query('destination', ParseIntPipe)
        destination: number
    )
    {
        return this.postalEdgesService.findOne(origin, destination);
    }

    @Get(':origin/:destination')
    getDistance(
        @Param('origin',      ParseIntPipe)
        origin: number,

        @Param('destination', ParseIntPipe)
        destination: number
    )
    {
        return this.postalEdgesService.getDistance(origin, destination);
    }


    @Patch()
    update(
        @Body()
        postalEdgeDTO: PostalEdgeDTO
    )
    {
        return this.postalEdgesService.update(postalEdgeDTO);
    }


    @Delete()
    remove(
        @Body()
        postalEdgeDTO: PostalEdge
    )
    {
        return this.postalEdgesService.remove(postalEdgeDTO);
    }
}
