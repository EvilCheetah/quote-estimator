import { Make } from '@prisma/client';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MakeService } from './make.service';

import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';


@Controller('make')
export class MakeController
{
    constructor(private readonly makeService: MakeService) {}


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


    @Get(':make_id')
    async find_one(
        @Param('make_id', ParseIntPipe)
        make_id: number
    ): Promise<Make>
    {
        return this.makeService.find_one(make_id);
    }


    @Patch(':make_id')
    async update(
        @Param('make_id', ParseIntPipe)
        make_id: number,
        
        @Body()
        updateMakeDTO: UpdateMakeDTO
    ): Promise<Make>
    {
        return this.makeService.update(make_id, updateMakeDTO);
    }

    
    @Delete(':make_id')
    async remove(
        @Param('make_id', ParseIntPipe)
        make_id: number
    ): Promise<Make>
    {
        return this.makeService.remove(make_id);
    }
}
