import { PostalCode } from '../types/postal-code.type';


export interface City
{
    state_abbreviation: string;

    city_name:          string;

    latitude:           string;

    longitude:          string;

    postal_codes:       PostalCode[];
}