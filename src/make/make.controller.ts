import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MakeService } from './make.service';
import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';

@Controller('make')
export class MakeController
{
    constructor(private readonly makeService: MakeService) {}

    @Post()
    create(@Body() createMakeDTO: CreateMakeDTO)
    {
        return this.makeService.create(createMakeDTO);
    }

    @Get()
    find_all()
    {
        return this.makeService.findAll();
    }

    @Get(':make_id')
    find_one(@Param('make_id') id: string)
    {
        return this.makeService.findOne(+id);
    }

    @Patch(':make_id')
    update(@Param('make_id') id: string, @Body() updateMakeDTO: UpdateMakeDTO)
    {
        return this.makeService.update(+id, updateMakeDTO);
    }

    @Delete(':make_id')
    remove(@Param('make_id') id: string)
    {
        return this.makeService.remove(+id);
    }
}
