import { ID } from "@common/types";


export interface JwtPayload
{
    sub?:    ID;
    
    email?:  string;
}