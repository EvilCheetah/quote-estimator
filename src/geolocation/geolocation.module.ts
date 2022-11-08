import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { CountryModule } from './country/country.module';


@Module({
    imports: [
        CountryModule,
        StateModule,
        CityModule,
    ]
})
export class GeolocationModule {}
