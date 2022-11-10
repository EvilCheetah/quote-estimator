import { Injectable } from '@nestjs/common';

import { PrismaService } from '@prisma';
import { CreateDistanceDTO } from './dto/create-distance.dto';


@Injectable()
export class DistanceService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createDistanceDTO: CreateDistanceDTO)
    {
        const { node_one, node_two, ground_distance } = createDistanceDTO;

        return this.prisma.distance.createMany({
            data: [
                { first_postal_code_node_id: node_one, second_postal_code_node_id: node_two, ground_distance },
                { first_postal_code_node_id: node_two, second_postal_code_node_id: node_one, ground_distance }
            ]
        });
    }

    findAll()
    {
        return this.prisma.distance.findMany();
    }

    async findOne(distance: CreateDistanceDTO)
    {
        const { node_one, node_two } = distance

        return this.prisma.distance.findMany({
            where: {
                OR: [
                    { first_postal_code_node_id: node_one, second_postal_code_node_id: node_two },
                    { first_postal_code_node_id: node_two, second_postal_code_node_id: node_one }
                ]
            }
        });
    }

    update(updateDistanceDTO: CreateDistanceDTO)
    {   
        const {node_one, node_two, ground_distance} = updateDistanceDTO;

        return this.prisma.distance.updateMany({
            where: {
                AND: [
                    { first_postal_code_node_id: node_one, second_postal_code_node_id: node_two },
                    { first_postal_code_node_id: node_two, second_postal_code_node_id: node_one }
                ]
            },
            data: { ground_distance }
        })     
    }

    remove(distanceDTO: CreateDistanceDTO)
    {
        const { node_one, node_two, ground_distance } = distanceDTO;

        return this.prisma.distance.deleteMany({
            where: {
                AND: [
                    { first_postal_code_node_id: node_one, second_postal_code_node_id: node_two },
                    { first_postal_code_node_id: node_two, second_postal_code_node_id: node_one }
                ]
            }
        })
    }
}
