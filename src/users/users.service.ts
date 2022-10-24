import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


@Injectable()
export class UsersService
{
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createUserDTO: CreateUserDTO)
    {
        return 'This action adds a new user';
    }

    findAll()
    {
        return `This action returns all users`;
    }

    findOneByEmail(email: string)
    {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    update(id: number, updateUserDTO: UpdateUserDTO)
    {
        return `This action updates a #${id} user`;
    }

    remove(id: number)
    {
        return `This action removes a #${id} user`;
    }
}
