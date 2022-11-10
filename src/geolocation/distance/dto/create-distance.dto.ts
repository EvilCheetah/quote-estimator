import { IsNumber } from "class-validator";
import { IsID } from "@decorator";


export class CreateDistanceDTO
{
    @IsID()
    first_postal_code_node_id:  number;

    @IsID()
    second_postal_code_node_id: number;

    @IsNumber()
    ground_distance:            number;
}