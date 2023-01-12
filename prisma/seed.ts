import { Prisma, PrismaClient } from "@prisma/client";

import { COUNTRIES } from "./data/countries";
import { US_POSTAL_CODES } from "./data/usa/postal-codes";
import { US_STATES } from "./data/usa/us-states";
import { VEHICLES } from "./data/vehicles";


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
    
    ///--------------- Populate Postal Codes ---------------///
    await prisma.postalCode.createMany({
        data: US_POSTAL_CODES.map(
            ({ postal_code, latitude, longitude }) => ({
                postal_code_value: postal_code,
                latitude:          Number(latitude),
                longitude:         Number(longitude)
            })
        ),
        skipDuplicates: true
    });

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
    for (const { cities, state_abbreviation } of states)
    {
        const { state_id } = await prisma.state.findUnique({
            where: { state_abbreviation }
        });

        await prisma.city.createMany({
            data: cities.map(
                ({ city_name, latitude, longitude, postal_codes }) =>
                ({
                    city_name,
                    latitude:   Number(latitude),
                    longitude:  Number(longitude),
                    state_id,
                })
            ),
            skipDuplicates: true
        });
    }

    ///------------ Connect Cities and Postal Codes -----------///
    for (const { cities, state_abbreviation } of states)
    {
        const existing_postal_codes = await prisma.postalCode.findMany();
        const cities_in_state       = await prisma.city.findMany({
            where: { state: { state_abbreviation } }
        });

        const cities_to_postal_codes = []; 
        
        for (const { city_name, postal_codes } of cities)
        {
            for (const postal_code of postal_codes)
            {
                cities_to_postal_codes.push({
                    city_id:        cities_in_state.find(city => city.city_name === city_name)?.city_id,
                    postal_code_id: existing_postal_codes.find(code => code.postal_code_value === postal_code)?.postal_code_id
                })
            }
        }

        await prisma.postalCodesInCities.createMany({
            data:           cities_to_postal_codes,
            skipDuplicates: true
        });
    }

    ///------------------- Vehicle Types -------------------///
    const vehicle_types = [
        ...new Set(
            VEHICLES.map( (vehicle) => (vehicle.type_name) )
        )
    ];

    await prisma.vehicleType.createMany({
        data: vehicle_types.map( (type) => ({ vehicle_type_name: type }) ),
        skipDuplicates: true
    });

    ///------------------- Vehicle Makes -------------------///
    const vehicle_makes = [
        ...new Set(
            VEHICLES.map( (vehicle) => (vehicle.make_name) )
        )
    ];

    await prisma.make.createMany({
        data: vehicle_makes.map( (make) => ({ make_name: make }) ),
        skipDuplicates: true
    });

    ///------------------- Vehicle Models -------------------///
    const types = await prisma.vehicleType.findMany();
    const makes = await prisma.make.findMany();

    await prisma.model.createMany({
        data: VEHICLES.map(
            ({ year, make_name, model_name, full_model_name, type_name}) => ({
                year,
                make_id: makes.find( (o) => (o.make_name === make_name) ).make_id,
                model_name,
                full_model_name,
                vehicle_type_id: types.find( (o) => (o.vehicle_type_name === type_name) ).vehicle_type_id
            })
        ),
        skipDuplicates: true
    })

    ///------------------- Quote -------------------///

    await prisma.quoteVariable.create({
        data: {
            coefficient:       47,
            power:             0.4565,
            base_price:        250,
            inoperational_fee: 150,
            enclosed_fee:      400
        }
    })
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