import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { CountryModule } from './country/country.module';
import { PostalCodeModule } from './postal-code/postal-code.module';


@Module({
    imports: [
        CountryModule,
        StateModule,
        CityModule,
        PostalCodeModule,
    ]
})
export class GeolocationModule {}
