import { PrismaClient, State } from "@prisma/client";
import { STATES } from "./data/states";


async function seed(prisma: PrismaClient)
{
    ///--------------- Populate States ---------------///
    const states = STATES.map(
        function(state)
        {
            const [state_name, state_abbreviation] = state;

            return { state_name, state_abbreviation };
        }
    ) as State[];
    
    for (const state of states){
        await prisma.state.create({
            data: state
        });
    }

    ///--------------- Populate Cities ---------------///
    
}


async function main() {
    const prisma = new PrismaClient();

    try
    {
        await seed(prisma)
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