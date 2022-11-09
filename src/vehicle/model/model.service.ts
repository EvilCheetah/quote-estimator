import { Injectable, NotFoundException } from '@nestjs/common';

import { ModelDTO } from './dto/model.dto';
import { PrismaService } from '@prisma';
import { ModelAdditionalFields } from '@constant';


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
                dimensions: { create: dimensions }
            },
            include: ModelAdditionalFields
        });
    }

    findAll()
    {
        return this.prisma.model.findMany();
    }

    async findOne(model_id: number)
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

        const model = await this.findOne(model_id);

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
        const model = await this.findOne(model_id);

        return this.prisma.model.delete({
            where: { model_id: model.model_id }
        })
    }
}
