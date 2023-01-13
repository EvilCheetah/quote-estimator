import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';

import { Make } from '@prisma/client';
import { MakeDTO } from './dto/make.dto';
import { MakeQuery } from './dto/make.query';
import { MakeService } from './make.service';


@Controller('make')
export class MakeController
{
    constructor(
        private readonly makeService: MakeService
    ) {}


    @Post()
    async create(
        @Body()
        makeDTO: MakeDTO
    ): Promise<Make>
    {
        return this.makeService.create(makeDTO);
    }

    @Get()
    async find_all(
        @Query()
        query: MakeQuery
    ): Promise<Make[]>
    {
        return this.makeService.find_all(query);
    }


    @Get(':id')
    async find_one(
        @Param('id', ParseIntPipe)
        make_id: number
    ): Promise<Make>
    {
        return this.makeService.find_one(make_id);
    }


    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe)
        make_id: number,
        
        @Body()
        makeDTO: MakeDTO
    ): Promise<Make>
    {
        return this.makeService.update(make_id, makeDTO);
    }

    
    @Delete(':id')
    async remove(
        @Param('id', ParseIntPipe)
        make_id: number
    ): Promise<Make>
    {
        return this.makeService.remove(make_id);
    }
}
