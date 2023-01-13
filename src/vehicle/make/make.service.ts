import { Injectable, NotFoundException } from '@nestjs/common';

import { Make } from '@prisma/client';
import { MakeDTO } from './dto/make.dto';
import { PrismaService } from '@prisma';
import { MakeQuery } from './dto/make.query';


@Injectable()
export class MakeService
{
    constructor(
        private readonly prisma:       PrismaService,
    ) {}

    async create(makeDTO: MakeDTO): Promise<Make>
    {
        return this.prisma.make.create({
            data: makeDTO
        })
    }
    
    async find_all({ year }: MakeQuery): Promise<Make[]>
    {
        return this.prisma.make.findMany({
            where: {
                models: { some: { year } } 
            }
        });
    }

    async find_one(make_id: number): Promise<Make>
    {
        const make = await this.prisma.make.findUnique({
            where: { make_id }
        });

        if ( !make )
            throw new NotFoundException(`Make with id: '${make_id}' was NOT FOUND`);
        
        return make;
    }

    async update(make_id: number, makeDTO: MakeDTO): Promise<Make>
    {
        const make = await this.find_one(make_id);

        return this.prisma.make.update({
            where: { make_id: make.make_id },
            data:  makeDTO
        });
    }

    async remove(make_id: number): Promise<Make>
    {
        const make = await this.find_one(make_id);

        return this.prisma.make.delete({
            where: { make_id: make.make_id }
        });
    }
}
