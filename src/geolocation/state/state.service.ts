import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStateDTO } from './dto/create-state.dto';
import { UpdateStateDTO } from './dto/update-state.dto';


@Injectable()
export class StateService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createStateDTO: CreateStateDTO)
    {
        return this.prisma.state.create({
            data: createStateDTO
        })
    }

    findAll()
    {
        return this.prisma.state.findMany();
    }

    async findOne(state_id: number)
    {
        const state = await this.prisma.state.findUnique({
            where: { state_id }
        });

        if ( !state )
            throw new NotFoundException(`State with id: '${state_id}' was NOT FOUND`)
        
        return state;
    }

    async update(state_id: number, updateStateDTO: UpdateStateDTO)
    {
        const state = await this.findOne(state_id);

        return this.prisma.state.update({
            where: { state_id: state.state_id },
            data:    updateStateDTO
        })
    }

    async remove(state_id: number)
    {
        const state = await this.findOne(state_id);

        return this.prisma.state.delete({
            where: { state_id: state.state_id }
        })
    }
}
