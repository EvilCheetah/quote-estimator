import { PostalCode } from '../types/postal-code.type';
import { Coordinates } from '../../../src/common/interface/coordinates.interface';


export interface IPostalCode
{
    [key: PostalCode]: Coordinates;
}