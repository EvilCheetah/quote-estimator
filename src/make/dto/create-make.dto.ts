import { IsPositive, IsString, Max, Min } from "class-validator";


export class CreateMakeDTO
{
    @IsString()
    make_name: string;

    @IsPositive()
    @Min(1800)
    @Max(2100)
    year:      number;
}
