import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { NewUserDTO } from '@common/dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class UsersService
{
    constructor(
        private readonly prisma:        PrismaService,
        private readonly configService: ConfigService
    ) {}

    async create(new_user: NewUserDTO): Promise<User>
    {
        const { password, confirm_password, ...user_data } = new_user;

        this._check_for_conflicts( user_data );

        const password_hash = await bcrypt.hash(
            password,
            this.configService.get<number>('SALT_ROUNDS')
        );

        return this.prisma.user.create({ 
            data: {
                ...user_data,
                password: password_hash
            }
        });
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

    findOneByUsername(username: string)
    {
        return this.prisma.user.findUnique({
            where: { username }
        });
    }

    async updateRefreshToken(user_id: number, refresh_token: string)
    {
        const refresh_token_hash = await bcrypt.hash(
            refresh_token, 
            this.configService.get<number>('SALT_ROUNDS')
        );

        await this.prisma.user.update({
            where: { user_id },
            data:  {
                refresh_token: refresh_token_hash
            }
        });
    }

    update(id: number)
    {
        return `This action updates a #${id} user`;
    }

    remove(id: number)
    {
        return `This action removes a #${id} user`;
    }

    private async _check_for_conflicts(user_data: Partial<User>)
    {
        const email_is_taken    = await this.findOneByEmail( user_data.email );

        if ( email_is_taken )
            throw new ConflictException(`Email is already taken`);

        const username_is_taken = await this.findOneByUsername( user_data.username );

        if ( username_is_taken )
            throw new ConflictException(`Username is already taken`);
    }
}
