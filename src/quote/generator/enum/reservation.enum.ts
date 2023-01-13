import { ObjectValues } from "@types";


export const RESERVATION = {
    'ASAP':              'As Soon as Possible',
    'WITHIN_2_WEEKS':    'Within 2 Weeks',
    'WITHIN_30_DAYS':    'Within 30 Days',
    'MORE_THAN_30_DAYS': 'More Than 30 Days'
} as const;


export type Reservation = ObjectValues<typeof RESERVATION>;


export const Reservations = Object.values(RESERVATION);