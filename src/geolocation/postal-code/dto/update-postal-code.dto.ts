import { PartialType } from '@nestjs/mapped-types';
import { CreatePostalCodeDTO } from './create-postal-code.dto';


export class UpdatePostalCodeDTO extends PartialType(CreatePostalCodeDTO) {}