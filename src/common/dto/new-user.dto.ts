import { IsEmail, IsString, Length } from "class-validator";

import { IsEqualTo, IsStrongPassword, IsUsername } from "@common/decorator";
import { MAX_ALLOWED_PASSWORD_LENGTH, MAX_ALLOWED_USERNAME_LENGTH } from "@common/constant";
import { MIN_ALLOWED_PASSWORD_LENGTH } from "@common/constant/limit/password.length";
import { MIN_ALLOWED_USERNAME_LENGTH } from "@common/constant/limit/username.length";


export class NewUserDTO
{
    @IsEmail()
    email:            string;

    @IsUsername()
    @Length( MIN_ALLOWED_USERNAME_LENGTH, MAX_ALLOWED_USERNAME_LENGTH )
    username:         string;

    @IsStrongPassword()
    @Length( MIN_ALLOWED_PASSWORD_LENGTH, MAX_ALLOWED_PASSWORD_LENGTH )
    password:         string;

    @IsString()
    @Length( MIN_ALLOWED_PASSWORD_LENGTH, MAX_ALLOWED_PASSWORD_LENGTH )
    @IsEqualTo('password', { 'message': "'confirm_password' should match 'password''" })
    confirm_password: string;
}