import { Make } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';


@Injectable()
export class MakeService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createMakeDTO: CreateMakeDTO): Promise<Make>
    {
        const {make_name, year} = createMakeDTO;

        return this.prisma.make.create({
            data: { make_name, year }
        })
    }

    async find_all(): Promise<Make[]>
    {
        return this.prisma.make.findMany();
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

    async update(make_id: number, updateMakeDTO: UpdateMakeDTO): Promise<Make>
    {
        const make = await this.find_one(make_id);

        return this.prisma.make.update({
            where: { make_id: make.make_id },
            data:  updateMakeDTO
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
