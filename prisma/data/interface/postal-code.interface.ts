import { PostalCode } from '../types/postal-code.type';
import { Coordinates } from '../../../src/common/interface/coordinates.interface';


export interface IPostalCode
{
    postal_code: string;

    latitude:    string;

    longitude:   string;
}