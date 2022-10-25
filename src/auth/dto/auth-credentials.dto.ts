import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthCredentialsDTO
{
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}