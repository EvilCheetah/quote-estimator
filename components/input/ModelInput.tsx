import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import styles from 'styles/VehicleForm.module.css';
import { useVehicleContext } from "@hook";
import { VehicleModel } from "@interface";


export function ModelInput()
{
    const { vehicleMake, vehicleYear, setVehicleModel } = useVehicleContext();
    const [ modelOptions, setmodelOptions ] = useState( [] as Array<VehicleModel> );
    const isDisabled = !vehicleMake;


    const populateModels = useCallback(
        async function()
        {
            if (!!vehicleMake)
            {
                const response = await axios.get< VehicleModel[] >(
                    'http://localhost:3000/model',
                    { params: { make_id: vehicleMake, year: vehicleYear } }
                );

                setmodelOptions(response.data);
            }
        },
        [vehicleYear, vehicleMake]
    )

    useEffect( () => { populateModels() }, [ populateModels ] );

    function onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if ( !vehicleMake )
        {
            setVehicleModel!(undefined);
            return;
        }

        const model_name = event.target.value;
        setVehicleModel!(
            modelOptions
                .find( (option) => (option.model_name === model_name) )
               ?.model_id
        );
    }

    return (
        <div
            className={`${styles['vehicle']}`}
        >
            <label htmlFor='vehicle-model'>Model</label>
            <input
                id='vehicle-model'
                disabled={isDisabled}
                type="text"
                onChange={onChange}
            />
        </div>
    );
}