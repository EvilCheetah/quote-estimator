import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakeService } from './make.service';
import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';


@Controller('make')
export class MakeController
{
    constructor(private readonly makeService: MakeService) {}

    @Post()
    async create(@Body() createMakeDTO: CreateMakeDTO)
    {
        return this.makeService.create(createMakeDTO);
    }

    @Get()
    async find_all()
    {
        return this.makeService.find_all();
    }

    @Get(':make_id')
    async find_one(@Param('make_id') make_id: string)
    {
        return this.makeService.find_one(+make_id);
    }

    @Patch(':make_id')
    async update(@Param('make_id') make_id: string, @Body() updateMakeDTO: UpdateMakeDTO)
    {
        return this.makeService.update(+make_id, updateMakeDTO);
    }

    @Delete(':make_id')
    async remove(@Param('make_id') make_id: string)
    {
        return this.makeService.remove(+make_id);
    }
}
