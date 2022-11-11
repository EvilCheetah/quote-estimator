import { PartialType } from '@nestjs/mapped-types';
import { CreatePostalEdgeDto } from './create-postal-edge.dto';

export class UpdatePostalEdgeDto extends PartialType(CreatePostalEdgeDto) {}
