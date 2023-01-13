import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { PostalCodeInCityDTO } from './dto/postal-code-in-city.dto';
import { PostalCodeInCityQuery } from './dto/postal-code-in-city.query';


@Injectable()
export class PostalCodeInCityService
{
    constructor(
        private readonly prisma:      PrismaService,
    ) {}

    create(postalCodeInCityDTO: PostalCodeInCityDTO)
    {
        return this.prisma.postalCodesInCities.create({
            data: postalCodeInCityDTO
        });
    }

    async find_one(city_id: number, postal_code_id: number)
    {
        const postal_in_city = await this.prisma.postalCodesInCities.findFirst({
            where: { city_id, postal_code_id }
        })
    }

    find_all(query: PostalCodeInCityQuery)
    {        
        return this.prisma.postalCodesInCities.findMany({
            where: query
        });
    }

    suggest(query: string)
    {
        return this.prisma.postalCodesInCities.findMany({
            where: {
                OR: [
                    { postal_code: { postal_code_value: { contains: query } } },
                    { city:        { city_name:         { contains: query } } }
                ]
            },
            select: {
                postal_code: true,
                city:        true
            }
        });
    }

    remove(postalCodeInCity: PostalCodeInCityDTO)
    {
        return this.prisma.postalCodesInCities.deleteMany({
            where: postalCodeInCity
        });
    }
}
