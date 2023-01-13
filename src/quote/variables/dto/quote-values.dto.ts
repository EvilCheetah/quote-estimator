import { IsNonNegative } from "@decorator";
import { IsNumber, IsOptional } from "class-validator";


export class QuoteVariablesDTO
{
    @IsOptional()
    @IsNumber()
    @IsNonNegative()
    coefficient:      number;

    @IsOptional()
    @IsNumber()
    @IsNonNegative()
    power:            number;

    @IsOptional()
    @IsNumber()
    @IsNonNegative()
    base_price:       number;

    @IsOptional()
    @IsNumber()
    @IsNonNegative()
    inoperational_fee: number;

    @IsOptional()
    @IsNumber()
    @IsNonNegative()
    enclosed_fee:     number;
}