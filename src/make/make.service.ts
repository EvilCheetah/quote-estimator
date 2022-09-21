import { Injectable } from '@nestjs/common';
import { CreateMakeDto } from './dto/create-make.dto';
import { UpdateMakeDto } from './dto/update-make.dto';

@Injectable()
export class MakeService {
  create(createMakeDto: CreateMakeDto) {
    return 'This action adds a new make';
  }

  findAll() {
    return `This action returns all make`;
  }

  findOne(id: number) {
    return `This action returns a #${id} make`;
  }

  update(id: number, updateMakeDto: UpdateMakeDto) {
    return `This action updates a #${id} make`;
  }

  remove(id: number) {
    return `This action removes a #${id} make`;
  }
}
