import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostalEdgesService } from './postal-edges.service';
import { CreatePostalEdgeDto } from './dto/create-postal-edge.dto';
import { UpdatePostalEdgeDto } from './dto/update-postal-edge.dto';

@Controller('postal-edges')
export class PostalEdgesController {
  constructor(private readonly postalEdgesService: PostalEdgesService) {}

  @Post()
  create(@Body() createPostalEdgeDto: CreatePostalEdgeDto) {
    return this.postalEdgesService.create(createPostalEdgeDto);
  }

  @Get()
  findAll() {
    return this.postalEdgesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postalEdgesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostalEdgeDto: UpdatePostalEdgeDto) {
    return this.postalEdgesService.update(+id, updatePostalEdgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postalEdgesService.remove(+id);
  }
}
