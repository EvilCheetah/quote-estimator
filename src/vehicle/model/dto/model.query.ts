import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { IsNonNegative } from "@decorator";


export class ModelQuery
{
    @IsOptional()
    @IsInt()
    @IsNonNegative()
    @Type( () => Number )
    make_id: number;

    @IsOptional()
    @IsInt()
    @IsNonNegative()
    @Type( () => Number )
    year:    number;
}