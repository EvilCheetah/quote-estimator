import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Injectable()
export class CityService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createCityDTO: CreateCityDTO)
    {
        return this.prisma.city.create({
            data: createCityDTO
        });
    }

    findAll()
    {
        return this.prisma.city.findMany();
    }

    async findOne(city_id: number)
    {
        const city = await this.prisma.city.findUnique({
            where: { city_id }
        });

        if ( !city )
            throw new NotFoundException(`City with id: '${city_id}' was NOT FOUND`);
        
        return city;
    }

    async update(city_id: number, updateCityDTO: UpdateCityDTO)
    {
        const city = await this.findOne(city_id);

        return this.prisma.city.update({
            where: { city_id: city.city_id },
            data:    updateCityDTO
        })
    }

    async remove(city_id: number)
    {
        const city = await this.findOne(city_id);

        return this.prisma.city.delete({
            where: { city_id: city.city_id }
        })
    }
}