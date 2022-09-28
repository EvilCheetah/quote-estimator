import { Injectable } from '@nestjs/common';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Injectable()
export class CityService
{
    create(createCityDTO: CreateCityDTO)
    {
        return 'This action adds a new city';
    }

    findAll()
    {
        return `This action returns all city`;
    }

    findOne(id: number)
    {
        return `This action returns a #${id} city`;
    }

    update(id: number, updateCityDTO: UpdateCityDTO)
    {
        return `This action updates a #${id} city`;
    }

    remove(id: number)
    {
        return `This action removes a #${id} city`;
    }
}