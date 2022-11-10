import { IsNumber, IsOptional } from "class-validator";
import { IsID } from "@decorator";


export class CreateDistanceDTO
{
    @IsID()
    node_one:           number;

    @IsID()
    node_two:           number;

    @IsNumber()
    @IsOptional()
    ground_distance:    number;
}