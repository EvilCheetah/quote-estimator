import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistanceService } from './distance.service';
import { CreateDistanceDTO } from './dto/create-distance.dto';
import { UpdateDistanceDTO } from './dto/update-distance.dto';

@Controller('distance')
export class DistanceController {
  constructor(private readonly distanceService: DistanceService) {}

  @Post()
  create(@Body() createDistanceDTO: CreateDistanceDTO) {
    return this.distanceService.create(createDistanceDTO);
  }

  @Get()
  findAll() {
    return this.distanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistanceDTO: UpdateDistanceDTO) {
    return this.distanceService.update(+id, updateDistanceDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distanceService.remove(+id);
  }
}
