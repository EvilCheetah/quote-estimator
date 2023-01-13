import { IsPositive, IsString, Max, Min } from "class-validator";


export class MakeDTO
{
    @IsString()
    make_name: string;
}
