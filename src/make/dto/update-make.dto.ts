import { PartialType } from '@nestjs/mapped-types';
import { CreateMakeDTO } from './create-make.dto';

export class UpdateMakeDTO extends PartialType(CreateMakeDTO) {}
