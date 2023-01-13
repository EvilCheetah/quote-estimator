import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { IsNonNegative } from "@decorator";


export class MakeQuery
{
    @IsOptional()
    @IsInt()
    @IsNonNegative()
    @Type( () => Number )
    year:    number;
}