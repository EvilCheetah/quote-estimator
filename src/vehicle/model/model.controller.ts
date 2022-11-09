import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDTO } from './dto/model.dto';


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


    @Get()
    findAll()
    {
        return this.modelService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe)
        model_id: number
    )
    {
        return this.modelService.findOne(model_id);
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
