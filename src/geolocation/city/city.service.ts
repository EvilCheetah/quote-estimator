import { Injectable, NotFoundException } from '@nestjs/common';

import { City } from '@prisma/client';
import { PrismaService } from '@prisma';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Injectable()
export class CityService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createCityDTO: CreateCityDTO): Promise<City>
    {
        return this.prisma.city.create({
            data: createCityDTO
        });
    }

    findAll(): Promise<City[]>
    {
        return this.prisma.city.findMany();
    }

    async findOne(city_id: number): Promise<City>
    {
        const city = await this.prisma.city.findUnique({
            where: { city_id }
        });

        if ( !city )
            throw new NotFoundException(`City with id: '${city_id}' was NOT FOUND`);
        
        return city;
    }

    async update(city_id: number, updateCityDTO: UpdateCityDTO): Promise<City>
    {
        const city = await this.findOne(city_id);

        return this.prisma.city.update({
            where: { city_id: city.city_id },
            data:    updateCityDTO
        })
    }

    async remove(city_id: number): Promise<City>
    {
        const city = await this.findOne(city_id);

        return this.prisma.city.delete({
            where: { city_id: city.city_id }
        })
    }
}