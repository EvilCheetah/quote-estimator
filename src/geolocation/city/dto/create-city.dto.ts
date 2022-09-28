import { IsInt, IsString } from "class-validator";


export class CreateCityDTO
{
    @IsInt()
    state_id:  number;

    @IsString()
    city_name: string;
}