import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { State } from '@prisma/client';
import { StateService } from './state.service';
import { CreateStateDTO } from './dto/create-state.dto';
import { UpdateStateDTO } from './dto/update-state.dto';


@Controller('state')
export class StateController
{
    constructor(private readonly stateService: StateService) {}

    @Post()
    create(
        @Body()
        createStateDTO: CreateStateDTO
    ): Promise<State>
    {
        return this.stateService.create(createStateDTO);
    }

    @Get()
    findAll(): Promise<State[]>
    {
        return this.stateService.findAll();
    }

    @Get(':state_id')
    findOne(
        @Param('state_id', ParseIntPipe)
        state_id: number
    ): Promise<State>
    {
        return this.stateService.findOne(state_id);
    }

    @Patch(':state_id')
    update(
        @Param('state_id', ParseIntPipe)
        state_id: number, 
        
        @Body()
        updateStateDTO: UpdateStateDTO
    ): Promise<State>
    {
        return this.stateService.update(state_id, updateStateDTO);
    }

    @Delete(':state_id')
    remove(
        @Param('state_id', ParseIntPipe)
        state_id: number
    ): Promise<State>
    {
        return this.stateService.remove(state_id);
    }
}
