import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as Input from "prompt-sync"
import { isEmail } from "class-validator";
import { PrismaClient, Role } from "@prisma/client";

import { isStrongPassword, isUsername } from "@common/decorator";


function _get_username(): string
{
    const input = Input();

    let username = input('Enter a Valid Username:  ');

    while ( !isUsername(username) )
    {
        console.log(
            'Username was not valid. ' +
            'It should start and end with alphanumberic character, and may only have - or _ in it. ' + 
            'Please '
        );
        username = input('Enter a Valid Username: ');
    }

    return username;
}


function _get_email(): string
{
    const input = Input();

    let email = input('Enter a Valid Email:     ');

    while ( !isEmail(email) )
    {
        console.log('Email was not valid. Please ')
        email = input('Enter a Valid Email: ')
    }

    return email;
}


function _get_password(): string
{
    const input = Input();

    let password     = input('Enter a Password:       ', { echo: '' }),
        confirmation = input('Repeat a Password:      ', { echo: '' });

    while ( 
        password !== confirmation //&& !isStrongPassword(password) 
    )
    {
        console.log('Passwords do not match. Try again...')

        password     = input('Enter a Password:  ', { echo: '' });
        confirmation = input('Repeat a Password: ', { echo: '' });
    }

    return bcrypt.hashSync(password, process.env.SALT_ROUNDS);
}


async function create_super_user(prisma: PrismaClient)
{
    const username = _get_username(),
          email    = _get_email(),
          password = _get_password();

    ///--------------- Create SuperUser --------------///
    await prisma.user.create({
        data: {
            username, email, password,
            role:     Role.SUPERUSER
        }
    });
}


async function main() {
    dotenv.config();

    const prisma = new PrismaClient();
    
    process.on('SIGINT', () => ( process.exit() ));

    try
    {
        await create_super_user(prisma)
    }
    
    catch (exception)
    {
        console.error(exception)
    }
    
    finally
    {
        await prisma.$disconnect()
    }
}


main()