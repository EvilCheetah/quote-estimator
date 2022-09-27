import { IsNonNegative } from "../decorator/is-non-negative.decorator";
import { Dimensions } from "../interface/dimensions.dto";


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