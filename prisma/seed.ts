import { PrismaClient, State } from "@prisma/client";
import { US_STATES } from "./data/us-states";


async function seed(prisma: PrismaClient)
{
    ///--------------- Populate States ---------------///
    const states = US_STATES.map(
        function(state)
        {
            const [country_abbreviation, state_name, state_abbreviation] = state;

            return { country_abbreviation, state_name, state_abbreviation };
        }
    );
    
    for (const state of states){
        const { country_abbreviation, state_name, state_abbreviation } = state;

        await prisma.state.create({
            data: {
                state_name,
                state_abbreviation,
                country: { 
                    connect: { country_abbreviation } 
                },
            }
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