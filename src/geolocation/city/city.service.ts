import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { City, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma';
import { CreateCityDTO } from './dto/create-city.dto';
import { UpdateCityDTO } from './dto/update-city.dto';


@Injectable()
export class CityService
{
    private readonly logger = new Logger(CityService.name);

    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createCityDTO: CreateCityDTO): Promise<City>
    {
        try
        {
            return this.prisma.city.create({
                data: createCityDTO
            });
        }

        catch (e)
        {
            if (e instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (e.code === 'P2002')
                    throw new ConflictException(
                        `City '${createCityDTO.city_name}' in state '${createCityDTO.state_id}' already EXISTS`
                    )
            }
        }
    }

    findAll()
    {
        return this.prisma.city.findMany({
            select: { city_name: true, postal_codes: true }
        });
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