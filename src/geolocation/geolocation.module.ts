import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { CountryModule } from './country/country.module';
import { PostalCodeModule } from './postal-code/postal-code.module';
import { PostalCodeInCityModule } from './postal-code-in-city/postal-code-in-city.module';


@Module({
    imports: [
        CountryModule,
        StateModule,
        CityModule,
        PostalCodeModule,
        PostalCodeInCityModule
    ]
})
export class GeolocationModule {}
