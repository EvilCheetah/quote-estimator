const TOMTOM_BASE_URL            = 'https://api.tomtom.com';

const TOMTOM_API_VERSION         = 1;

export const TOMTOM_CONTENT_TYPE = 'json'

export const TOMTOM_LANGUAGE     = 'en-US'


export const TOMTOM_URL = (
    `${TOMTOM_BASE_URL}`    + 
    `/routing`              +
    `/${TOMTOM_API_VERSION}` +
    `/calculateRoute`
)