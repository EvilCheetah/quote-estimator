import { IsEmail, IsString, MaxLength } from "class-validator";

import { IsEqualTo, IsStrongPassword, IsUsername } from "@common/decorator";


export class NewUserDTO
{
    @IsEmail()
    email:            string;

    @IsUsername()
    @MaxLength(120)
    username:         string;

    @IsStrongPassword()
    @MaxLength(120)
    password:         string;

    @IsString()
    @MaxLength(120)
    @IsEqualTo('password', { 'message': "'confirm_password' should match 'password''" })
    confirm_password: string;
}