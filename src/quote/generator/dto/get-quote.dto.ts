import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsPhoneNumber, ValidateIf, ValidateNested } from "class-validator";

import { IsNonNegative } from "@decorator";
import { CoordinatesDTO } from "@dto/coordinates.dto";
import { Coordinates } from "@interface/coordinates.interface";
import { Reservation, Reservations } from "../enum/reservation.enum";


export class GetQuoteDTO
{
    @IsEmail()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone_number: string;

    @ValidateNested()
    @Type( () => CoordinatesDTO )
    from: Coordinates;

    @ValidateNested()
    @Type( () => CoordinatesDTO )
    to:   Coordinates;

    @IsInt()
    @IsNonNegative()
    vehicle_model_id: number;

    @IsBoolean()
    is_operational: boolean;

    @IsBoolean()
    is_enclosed:    boolean;

    @ValidateIf( (o) => (o.exact_date == undefined) )
    @IsEnum(Reservations)
    reservation:    Reservation;

    @ValidateIf( (o) => (o.reservation == undefined) )
    @IsDate()
    @Type( () => Date )
    exact_date: Date; 
}