import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakeService } from './make.service';
import { CreateMakeDto } from './dto/create-make.dto';
import { UpdateMakeDto } from './dto/update-make.dto';

@Controller('make')
export class MakeController
{
    constructor(private readonly makeService: MakeService) {}

    @Post()
    create(@Body() createMakeDto: CreateMakeDto)
    {
        return this.makeService.create(createMakeDto);
    }

    @Get()
    findAll()
    {
        return this.makeService.findAll();
    }

    @Get(':make_id')
    findOne(@Param('make_id') id: string)
    {
        return this.makeService.findOne(+id);
    }

    @Patch(':make_id')
    update(@Param('make_id') id: string, @Body() updateMakeDto: UpdateMakeDto)
    {
        return this.makeService.update(+id, updateMakeDto);
    }

    @Delete(':make_id')
    remove(@Param('make_id') id: string)
    {
        return this.makeService.remove(+id);
    }
}
