import { PrismaClient, Role } from "@prisma/client";


async function create_super_user(prisma: PrismaClient)
{
    ///--------------- Create SuperUser --------------///
    await prisma.user.create({
        data: {
            username: process.env.SUPER_USER_USERNAME,
            email:    process.env.SUPER_USER_EMAIL,
            password: process.env.SUPER_USER_PASSWORD,
            role:     Role.ADMIN
        }
    });
}


async function main() {
    const prisma = new PrismaClient();

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