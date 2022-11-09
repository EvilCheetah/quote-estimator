import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { Make } from '@prisma/client';
import { MakeService } from './make.service';
import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';


@Controller('make')
export class MakeController
{
    constructor(
        private readonly makeService: MakeService
    ) {}


    @Post()
    async create(
        @Body()
        createMakeDTO: CreateMakeDTO
    ): Promise<Make>
    {
        return this.makeService.create(createMakeDTO);
    }


    @Get()
    async find_all(): Promise<Make[]>
    {
        return this.makeService.find_all();
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
        updateMakeDTO: UpdateMakeDTO
    ): Promise<Make>
    {
        return this.makeService.update(make_id, updateMakeDTO);
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
