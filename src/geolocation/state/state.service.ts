import { Injectable, NotFoundException } from '@nestjs/common';

import { State } from '@prisma/client';
import { PrismaService } from '@prisma';
import { CreateStateDTO } from './dto/create-state.dto';
import { UpdateStateDTO } from './dto/update-state.dto';


@Injectable()
export class StateService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createStateDTO: CreateStateDTO): Promise<State>
    {
        const { country_id, country_abbreviation, ...state_data } = createStateDTO;

        return this.prisma.state.create({
            data: {
                ...state_data,
                country: { 
                    connect: { country_id, country_abbreviation }
                },
            }
        });
    }

    findAll(): Promise<State[]>
    {
        return this.prisma.state.findMany();
    }

    async findOne(state_id: number): Promise<State>
    {
        const state = await this.prisma.state.findUnique({
            where: { state_id }
        });

        if ( !state )
            throw new NotFoundException(`State with id: '${state_id}' was NOT FOUND`)
        
        return state;
    }

    async update(state_id: number, updateStateDTO: UpdateStateDTO): Promise<State>
    {
        const state = await this.findOne(state_id);

        return this.prisma.state.update({
            where: { state_id: state.state_id },
            data:    updateStateDTO
        })
    }

    async remove(state_id: number): Promise<State>
    {
        const state = await this.findOne(state_id);

        return this.prisma.state.delete({
            where: { state_id: state.state_id }
        })
    }
}
