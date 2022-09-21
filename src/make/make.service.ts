import { Injectable } from '@nestjs/common';
import { CreateMakeDTO } from './dto/create-make.dto';
import { UpdateMakeDTO } from './dto/update-make.dto';


@Injectable()
export class MakeService
{
    create(createMakeDTO: CreateMakeDTO)
    {
        return 'This action adds a new make';
    }

    find_all()
    {
        return `This action returns all make`;
    }

    find_one(make_id: number)
    {
        return `This action returns a #${make_id} make`;
    }

    update(make_id: number, updateMakeDTO: UpdateMakeDTO)
    {
        return `This action updates a #${make_id} make`;
    }

    remove(make_id: number)
    {
        return `This action removes a #${make_id} make`;
    }
}
