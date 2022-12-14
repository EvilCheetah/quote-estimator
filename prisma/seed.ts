import { Promise } from "bluebird";
import { Prisma, PrismaClient } from "@prisma/client";

import { COUNTRIES } from "./data/countries";
import { US_POSTAL_CODES } from "./data/usa/postal-codes";
import { US_POSTAL_EDGES } from "./data/usa/us-postal-code.edges";
import { US_STATES } from "./data/usa/us-states";


async function seed(prisma: PrismaClient)
{
    ///------------- Populate Countries --------------///
    const countries = COUNTRIES.map(
        function(country)
        {
            const [country_name, country_abbreviation] = country;

            return { country_name, country_abbreviation };
        }
    );

    await prisma.country.createMany({
        data:           countries,
        skipDuplicates: true
    })

    ///--------------- Populate States ---------------///
    const states = US_STATES.map(
        function(state)
        {
            const [country_abbreviation, state_name, state_abbreviation, cities] = state;

            return { country_abbreviation, state_name, state_abbreviation, cities };
        }
    );
    
    for (const state of states)
    {
        const { country_abbreviation, state_name, state_abbreviation } = state;

        try
        {
            await prisma.state.create({
                data: {
                    state_name,
                    state_abbreviation,
                    country: { 
                        connect: { country_abbreviation } 
                    }
                }
            });
        }
        catch (e)
        {
            if (e instanceof Prisma.PrismaClientKnownRequestError)
            {
                if (e.code === 'P2002')
                    console.log(`State with name "${state_name}" in "${country_abbreviation}" already EXISTS`)
            }
        }
    }

    ///--------------- Populate Cities ---------------///
    for (const state of states)
    {
        const { state_abbreviation, cities } = state;

        const { state_id } = await prisma.state.findUnique({
            where: { state_abbreviation }
        });

        await prisma.city.createMany({
            data: cities.map(
                ([ city_name ]) => ({ city_name, state_id })
            ),
            skipDuplicates: true
        });
    }

    ///--------------- Populate Postal Codes ---------------///
    await prisma.postalCode.createMany({
        data: Object.keys(US_POSTAL_CODES).map(
            (postal_code_value) => {
                const {latitude, longitude} = US_POSTAL_CODES[postal_code_value];

                return { postal_code_value, latitude, longitude, city_id: null }
            }
        ),
        skipDuplicates: true
    });

    ///------------ Populate Postal Codes Edges -----------///
    Promise.map(
        US_POSTAL_EDGES,
        async function({ origin, destination, land_distance, water_distance })
        {
            const postalPrismaClient = new PrismaClient();

            try
            {
                await postalPrismaClient.postalEdge.create({
                    data: {
                        node:  { connect: { postal_code_value: origin } },
                        child: { connect: { postal_code_value: destination } },
                        land_distance,
                        water_distance
                    }
                });

                await postalPrismaClient.postalEdge.create({
                    data: {
                        node:  { connect: { postal_code_value: destination } },
                        child: { connect: { postal_code_value: origin } },
                        land_distance,
                        water_distance
                    }
                });
            }
            catch (e)
            {
                if (e instanceof Prisma.PrismaClientKnownRequestError)
                {
                    if (e.code === 'P2002')
                        console.log(`Leg between "${origin}" and "${destination}" already EXISTS`)
                }
            }

            console.log(`Leg between ${origin} and ${destination} has been SUCCESSFULLY created!`)
            await postalPrismaClient.$disconnect();
        },
        { concurrency: 100 }
    )
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