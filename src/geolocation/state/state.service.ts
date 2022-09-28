import { Injectable } from '@nestjs/common';
import { CreateStateDTO } from './dto/create-state.dto';
import { UpdateStateDTO } from './dto/update-state.dto';


@Injectable()
export class StateService
{
    create(createStateDTO: CreateStateDTO)
    {
        return 'This action adds a new state';
    }

    findAll()
    {
        return `This action returns all state`;
    }

    findOne(id: number)
    {
        return `This action returns a #${id} state`;
    }

    update(id: number, updateStateDTO: UpdateStateDTO)
    {
        return `This action updates a #${id} state`;
    }

    remove(id: number)
    {
        return `This action removes a #${id} state`;
    }
}
