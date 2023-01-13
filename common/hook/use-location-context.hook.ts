import { useContext } from "react"
import { LocationContext } from "../context/location.context"


export function useLocationContext()
{
    return useContext(LocationContext);
}