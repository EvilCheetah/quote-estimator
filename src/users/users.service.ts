import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';

import { NewUserDTO } from '@dto';
import { Role, User } from '@prisma/client';
import { UniqueUserCriteria } from '@interface';
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

        await this._check_for_conflicts(user_data);

        const password_hash = await bcrypt.hash(
            password,
            +this.configService.get('SALT_ROUNDS')
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
        return this.prisma.user.findMany();
    }


    async findOneBy(criteria: UniqueUserCriteria): Promise<User>
    {
        const user = await this.prisma.user.findUnique({
            where: criteria
        });

        return user;
    }

    findOneById(user_id: number): Promise<User>
    {
        return this.findOneBy({ user_id });;
    }


    findOneByEmail(email: string): Promise<User>
    {
        return this.findOneBy({ email });
    }


    findOneByUsername(username: string): Promise<User>
    {
        return this.findOneBy({ username });
    }


    async updateRefreshToken(user_id: number, refresh_token: string)
    {
        const refresh_token_hash = await argon2.hash(refresh_token);

        await this.prisma.user.update({
            where: { user_id },
            data:  {
                refresh_token: refresh_token_hash
            }
        });
    }


    async resetRefreshToken(user_id: number)
    {
        await this.prisma.user.updateMany({
            where: {
                user_id: user_id,
                refresh_token: {
                    not: null
                }
            },
            data: { refresh_token: null }
        });

        return true;
    }


    update(id: number)
    {
        return `This action updates a #${id} user`;
    }


    async remove(user_id: number)
    {
        const user = await this.findOneBy({ user_id });

        if ( user.role === Role.SUPERUSER )
            throw new ForbiddenException('Unable to delete superuser');

        return this.prisma.user.delete({
            where: { user_id: user.user_id }
        })
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
