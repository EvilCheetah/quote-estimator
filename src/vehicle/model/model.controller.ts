import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDTO } from './dto/model.dto';


@Controller('model')
export class ModelController
{
    constructor(private readonly modelService: ModelService) {}

    
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


    @Get(':model_id')
    findOne(
        @Param('model_id', ParseIntPipe)
        model_id: number
    )
    {
        return this.modelService.findOne(model_id);
    }


    @Patch(':model_id')
    update(
        @Param('model_id', ParseIntPipe)
        model_id: number, 
        
        @Body()
        updateModelDTO: ModelDTO
    )
    {
        return this.modelService.update(model_id, updateModelDTO);
    }


    @Delete(':model_id')
    remove(
        @Param('model_id', ParseIntPipe)
        model_id: number
    )
    {
        return this.modelService.remove(model_id);
    }
}
