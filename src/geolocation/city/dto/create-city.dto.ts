import { IsInt, IsPositive, IsString } from "class-validator";


export class CreateCityDTO
{
    @IsInt()
    @IsPositive()
    state_id:  number;

    @IsString()
    city_name: string;
}