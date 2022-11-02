import { Role } from "@prisma/client";


export interface UniqueUserCriteria
{
    user_id?:  number;

    email?:    string;

    username?: string;
    
    role?:     Role;
}