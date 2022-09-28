import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDTO } from './create-city.dto';

export class UpdateCityDTO extends PartialType(CreateCityDTO) {}
