import axios from "axios";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";

import styles from 'styles/VehicleForm.module.css';
import { useVehicleContext } from "@hook";
import { VehicleMake } from "@interface";


export function MakeInput()
{
    const { vehicleYear, setVehicleMake, setVehicleModel } = useVehicleContext();
    const [ makeOptions, setMakeOptions ] = useState( [] as Array<VehicleMake> );
    const isDisabled = !vehicleYear;
    

    const populateMakes = useCallback(
        async function()
        {
            if (!!vehicleYear)
            {
                console.debug(`Firing request to Make`)
                const response = await axios.get< VehicleMake[] >(
                    'http://localhost:3000/make',
                    { params: { year: vehicleYear } }
                );

                setMakeOptions(response.data);
            }
        },
        [vehicleYear]
    )

    useEffect( () => { populateMakes() }, [ populateMakes ] );

    function onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if ( !vehicleYear )
        {
            setVehicleMake!(undefined);
            setVehicleModel!(undefined);
            return;
        }

        console.log(`Vehicle Make is ${event.target.value}`);
        
        const make_name = event.target.value;
        console.log(`ID: ${makeOptions?.find( (option) => (option.make_name === make_name) )?.make_id}`)
        setVehicleMake!(
            makeOptions
                .find( (option) => (option.make_name.toLowerCase() === make_name.toLowerCase()) )
               ?.make_id
        )
    }

    return (
        <div
            className={`${styles['vehicle']}`}
        >
            <label htmlFor='vehicle-make'>Make</label>
            <input
                id='vehicle-make'
                disabled={isDisabled}
                type="text"
                onChange={onChange}
            />
        </div>
    );
}