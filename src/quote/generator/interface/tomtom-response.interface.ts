import { DateTimeString } from "@types";
import { Coordinates } from "@interface/coordinates.interface";


export interface TomTomResponse
{
    formatVersion: `${number}.${number}.${number}`;

    routes: Array<Route>;
}


export interface Route
{
    summary:  Summary;

    legs:     Array<RouteLeg>;

    sections: Array<Section>
}


export interface Section
{
    startPointIndex: number;
    endPointIndex:   number;
    sectionType:     string;
    travelMode:      string;
}


export interface RouteLeg
{
    summary: Summary;

    points:  Array<Coordinates>
}


export interface Summary
{
    lengthInMeters:        number;
    travelTimeInSeconds:   number;
    trafficDelayInSeconds: number;
    trafficLengthInMeters: number;
    departureTime:         DateTimeString;
    arrivalTime:           DateTimeString;
}