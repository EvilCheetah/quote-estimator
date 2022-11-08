import { IsNonNegative } from "@decorator";
import { Dimensions } from "@interface";


export class DimensionsDTO
    implements
        Dimensions
{
    @IsNonNegative()
    length: number;

    @IsNonNegative()
    width:  number;

    @IsNonNegative()
    height: number;
}