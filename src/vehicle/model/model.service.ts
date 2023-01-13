import { Injectable, NotFoundException } from '@nestjs/common';

import { ModelDTO } from './dto/model.dto';
import { PrismaService } from '@prisma';
import { ModelAdditionalFields } from '@constant';
import { ModelQuery } from './dto/model.query';


@Injectable()
export class ModelService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createModelDTO: ModelDTO)
    {
        const {dimensions, ...model_data} = createModelDTO;

        return this.prisma.model.create({
            data: {
                ...model_data,
            },
            include: ModelAdditionalFields
        });
    }

    async get_all_years()
    {
        const vehicles = await this.find_all({} as ModelQuery);

        return [
            ...new Set(
                vehicles.map( (vehicle) => (vehicle.year) )
            )
        ];
    }

    find_all({ year, make_id }: ModelQuery)
    {
        return this.prisma.model.findMany({
            where:  { year, make_id },
            select: {
                model_id:        true,
                make_id:         true,
                year:            true,
                model_name:      true,
                full_model_name: true,
                vehicle_type:    true
            }
        });
    }

    async find_one(model_id: number)
    {
        const model = await this.prisma.model.findUnique({
            where: { model_id },
            include: ModelAdditionalFields
        });

        if ( !model )
            throw new NotFoundException(`Model with id: '${model_id} was NOT FOUND'`);

        return model;
    }

    async update(model_id: number, updateModelDTO: ModelDTO)
    {
        const { dimensions, ...model_data } = updateModelDTO;

        const model = await this.find_one(model_id);

        await this.prisma.dimensions.update({
            where: { model_id: model.model_id },
            data:    dimensions
        });

        return this.prisma.model.update({
            where: { model_id: model.model_id },
            data:  {
                ...model_data
            },
            include: ModelAdditionalFields
        })
    }

    async remove(model_id: number)
    {
        const model = await this.find_one(model_id);

        return this.prisma.model.delete({
            where: { model_id: model.model_id }
        })
    }
}
