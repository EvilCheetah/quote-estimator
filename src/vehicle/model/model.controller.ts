import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';

import { ModelDTO } from './dto/model.dto';
import { ModelQuery } from './dto/model.query';
import { ModelService } from './model.service';


@Controller('model')
export class ModelController
{
    constructor(
        private readonly modelService: ModelService
    ) {}

    
    @Post()
    create(
        @Body()
        createModelDTO: ModelDTO
    )
    {
        return this.modelService.create(createModelDTO);
    }

    @Get('years')
    get_all_years()
    {
        return this.modelService.get_all_years();
    }

    @Get()
    find_all(
        @Query()
        query: ModelQuery
    )
    {
        return this.modelService.find_all(query);
    }


    @Get(':id')
    find_one(
        @Param('id', ParseIntPipe)
        model_id: number
    )
    {
        return this.modelService.find_one(model_id);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        model_id: number, 
        
        @Body()
        updateModelDTO: ModelDTO
    )
    {
        return this.modelService.update(model_id, updateModelDTO);
    }


    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe)
        model_id: number
    )
    {
        return this.modelService.remove(model_id);
    }
}
