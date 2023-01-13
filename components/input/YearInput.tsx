import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import styles from 'styles/VehicleForm.module.css';
import { useVehicleContext } from "@hook";
import { isYear } from "common/util/is-year.funtions";


export function YearInput()
{
    const { setVehicleYear, setVehicleMake, setVehicleModel } = useVehicleContext();
    const [ yearOptions, setYearOptions ] = useState([] as Array<number>);

    const populateYears = useCallback(
        async function()
        {
            const response = await axios.get< number[] >('http://localhost:3000/model/years');

            setYearOptions(response.data);
        },
        []
    )

    useEffect( () => { populateYears() }, [ populateYears ] );

    function onChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if ( !isYear(event.target.value) )
        {
            setVehicleYear!(undefined);
            setVehicleMake!(undefined);
            setVehicleModel!(undefined);
            return;
        }
        
        setVehicleYear!(+event.target.value);
    }

    return (
        <div
            className={`${styles['vehicle']}`}
        >
            <label htmlFor='vehicle-year'>Year</label>
            <input
                id='vehicle-year'
                type="text"
                maxLength={4}
                onChange={onChange}
            />
        </div>
    );
}