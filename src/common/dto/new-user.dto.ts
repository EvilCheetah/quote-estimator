import { IsEmail, Max } from "class-validator";

import { IsEqualTo, IsStrongPassword, IsUsername } from "@common/decorator";


export class NewUserDTO
{
    @IsEmail()
    email:            string;

    @IsUsername()
    @Max(120)
    username:         string;

    @IsStrongPassword()
    @Max(120)
    password:         string;

    @Max(120)
    @IsEqualTo('password', { 'message': "'confirm_password' should match 'password''" })
    confirm_password: string;
}