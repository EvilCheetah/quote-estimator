export interface Quote
{
    quote_id:         number;
    
    created_at:       Date;
    updated_at:       Date;      

    email:            string;
    phone_number?:    string;
    reservation:      string;
    exact_date:       string;

    vehicle_model_id: number;
    is_operational:   boolean;
    is_enclosed:      boolean;

    from_lat:         number;
    from_long:        number;
    to_lat:           number;
    to_long:          number;

    distance:         number;
    quote_estimate:   number;
}