import { Injectable } from '@nestjs/common';
import { CreatePostalEdgeDto } from './dto/create-postal-edge.dto';
import { UpdatePostalEdgeDto } from './dto/update-postal-edge.dto';

@Injectable()
export class PostalEdgesService {
  create(createPostalEdgeDto: CreatePostalEdgeDto) {
    return 'This action adds a new postalEdge';
  }

  findAll() {
    return `This action returns all postalEdges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postalEdge`;
  }

  update(id: number, updatePostalEdgeDto: UpdatePostalEdgeDto) {
    return `This action updates a #${id} postalEdge`;
  }

  remove(id: number) {
    return `This action removes a #${id} postalEdge`;
  }
}
