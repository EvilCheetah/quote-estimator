import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@prisma';
import { CreatePostalCodeDTO } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDTO } from './dto/update-postal-code.dto';


@Injectable()
export class PostalCodeService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createPostalCodeDTO: CreatePostalCodeDTO)
    {
        return this.prisma.postalCode.create({
            data: createPostalCodeDTO
        });
    }

    findAll()
    {
        return this.prisma.postalCode.findMany();
    }

    async findOne(postal_code_id: number)
    {
        const postal_code = await this.prisma.postalCode.findUnique({
            where: { postal_code_id }
        });

        if ( !postal_code )
            throw new NotFoundException(`Postal Code with id: "${postal_code_id}" was NOT FOUND`);

        return postal_code;
    }

    async update(postal_code_id: number, updatePostalCodeDTO: UpdatePostalCodeDTO)
    {
        const postal_code = await this.findOne(postal_code_id);

        return this.prisma.postalCode.update({
            where: { postal_code_id: postal_code.postal_code_id },
            data:    updatePostalCodeDTO
        });
    }

    async remove(postal_code_id: number)
    {
        const postal_code = await this.findOne(postal_code_id);

        return this.prisma.postalCode.delete({
            where: { postal_code_id: postal_code.postal_code_id }
        });
    }
}
