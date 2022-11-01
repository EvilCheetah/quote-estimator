import { IsEmail, IsString, MaxLength } from "class-validator";

import { IsEqualTo, IsStrongPassword, IsUsername } from "@common/decorator";
import { MAX_ALLOWED_PASSWORD_LENGTH, MAX_ALLOWED_USERNAME_LENGTH } from "@common/constant";


export class NewUserDTO
{
    @IsEmail()
    email:            string;

    @IsUsername()
    @MaxLength( MAX_ALLOWED_USERNAME_LENGTH )
    username:         string;

    @IsStrongPassword()
    @MaxLength( MAX_ALLOWED_PASSWORD_LENGTH )
    password:         string;

    @IsString()
    @MaxLength( MAX_ALLOWED_PASSWORD_LENGTH )
    @IsEqualTo('password', { 'message': "'confirm_password' should match 'password''" })
    confirm_password: string;
}