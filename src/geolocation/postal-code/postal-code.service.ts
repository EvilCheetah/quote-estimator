import { Injectable } from '@nestjs/common';
import { CreatePostalCodeDTO } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDTO } from './dto/update-postal-code.dto';


@Injectable()
export class PostalCodeService
{
    create(createPostalCodeDTO: CreatePostalCodeDTO)
    {
        return 'This action adds a new postalCode';
    }

    findAll()
    {
        return `This action returns all postalCode`;
    }

    findOne(id: number)
    {
        return `This action returns a #${id} postalCode`;
    }

    update(id: number, updatePostalCodeDTO: UpdatePostalCodeDTO)
    {
        return `This action updates a #${id} postalCode`;
    }

    remove(id: number)
    {
        return `This action removes a #${id} postalCode`;
    }
}
