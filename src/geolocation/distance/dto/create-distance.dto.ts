import { IsNumber } from "class-validator";
import { IsID } from "@decorator";


export class CreateDistanceDTO
{
    @IsID()
    node_one:           number;

    @IsID()
    node_two:           number;

    @IsNumber()
    ground_distance:    number;
}