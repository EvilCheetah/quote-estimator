import { Type } from "class-transformer";
import { IsInt, IsNumber, IsString, ValidateNested } from "class-validator";

import { Dimensions } from "src/common/interface/dimensions.dto";
import { DimensionsDTO } from "src/common/dto/dimensions.dto";


export class ModelDTO
{
    @IsInt()
    make_id:    number;

    @IsString()
    model_name: string;

    @IsNumber()
    weight:     number;
    
    @ValidateNested({ each: true })
    @Type( (_type) => DimensionsDTO )
    dimensions: Dimensions;
}