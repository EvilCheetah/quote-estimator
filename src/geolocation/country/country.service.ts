import { Injectable } from '@nestjs/common';
import { CreateCountryDTO } from './dto/create-country.dto';
import { UpdateCountryDTO } from './dto/update-country.dto';


@Injectable()
export class CountryService {
  create(createCountryDTO: CreateCountryDTO) {
    return 'This action adds a new country';
  }

  findAll() {
    return `This action returns all country`;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDTO: UpdateCountryDTO) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}