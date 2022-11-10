import { PartialType } from '@nestjs/mapped-types';
import { CreateDistanceDTO } from './create-distance.dto';

export class UpdateDistanceDTO extends PartialType(CreateDistanceDTO) {}
