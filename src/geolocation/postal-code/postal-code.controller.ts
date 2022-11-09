import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { PostalCodeService } from './postal-code.service';
import { CreatePostalCodeDTO } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDTO } from './dto/update-postal-code.dto';


@Controller('postal-code')
export class PostalCodeController
{
    constructor(
        private readonly postalCodeService: PostalCodeService
    ) {}


    @Post()
    create(
        @Body()
        createPostalCodeDTO: CreatePostalCodeDTO
    )
    {
        return this.postalCodeService.create(createPostalCodeDTO);
    }


    @Get()
    findAll()
    {
        return this.postalCodeService.findAll();
    }


    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe)
        postal_code_id: number
    )
    {
        return this.postalCodeService.findOne(postal_code_id);
    }


    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)
        postal_code_id: number,
        
        @Body()
        updatePostalCodeDTO: UpdatePostalCodeDTO
    )
    {
        return this.postalCodeService.update(postal_code_id, updatePostalCodeDTO);
    }


    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe)
        postal_code_id: number
    )
    {
        return this.postalCodeService.remove(postal_code_id);
    }
}
