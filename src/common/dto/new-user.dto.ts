import { IsEmail, IsString, Length } from "class-validator";

import { IsEqualTo, IsStrongPassword, IsUsername } from "@decorator";
import {
    MIN_ALLOWED_PASSWORD_LENGTH,
    MAX_ALLOWED_PASSWORD_LENGTH,
    MIN_ALLOWED_USERNAME_LENGTH,
    MAX_ALLOWED_USERNAME_LENGTH
} from "@constant";


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