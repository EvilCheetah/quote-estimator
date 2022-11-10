import { Injectable } from '@nestjs/common';
import { CreateDistanceDTO } from './dto/create-distance.dto';
import { UpdateDistanceDTO } from './dto/update-distance.dto';

@Injectable()
export class DistanceService {
  create(createDistanceDTO: CreateDistanceDTO) {
    return 'This action adds a new distance';
  }

  findAll() {
    return `This action returns all distance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} distance`;
  }

  update(id: number, updateDistanceDTO: UpdateDistanceDTO) {
    return `This action updates a #${id} distance`;
  }

  remove(id: number) {
    return `This action removes a #${id} distance`;
  }
}
