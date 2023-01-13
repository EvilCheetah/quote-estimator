import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { Dimensions } from "@interface";
import { DimensionsDTO } from "@dto";


export class ModelDTO
{
    @IsInt()
    make_id:            number;

    @IsInt()
    year:               number;

    @IsInt()
    vehicle_type_id:    number;

    @IsString()
    model_name:         string;

    @IsString()
    full_model_name:    string;
    
    @IsNumber()
    @IsOptional()
    weight:             number;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type( (_type) => DimensionsDTO )
    dimensions:         Dimensions;
}