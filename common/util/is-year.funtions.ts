const year_pattern = /\d{4}/


export function isYear(value: unknown)
{
    return typeof(value) === 'string'  && 
           year_pattern.test(value);
}