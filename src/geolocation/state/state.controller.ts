import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDTO } from './dto/create-state.dto';
import { UpdateStateDTO } from './dto/update-state.dto';


@Controller('state')
export class StateController
{
    constructor(private readonly stateService: StateService) {}

    @Post()
    create(@Body() createStateDTO: CreateStateDTO)
    {
        return this.stateService.create(createStateDTO);
    }

    @Get()
    findAll()
    {
        return this.stateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.stateService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStateDTO: UpdateStateDTO)
    {
        return this.stateService.update(+id, updateStateDTO);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.stateService.remove(+id);
    }
}
