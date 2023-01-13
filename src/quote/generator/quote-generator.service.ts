import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

import { MI_TO_M } from '@constant';
import { GetQuoteDTO } from './dto/get-quote.dto';
import { Reservation } from './enum/reservation.enum';
import { MORE_THAN_30_DAYS } from './const/time.constant';
import { TomTomResponse } from './interface/tomtom-response.interface';
import { TOMTOM_CONTENT_TYPE, TOMTOM_LANGUAGE, TOMTOM_URL } from './const/tomtom.url';
import { TomTomDistanceRequest } from './interface/tomtom-distance-request.interface';
import { QuoteVariablesService } from '../variables/quote-variables.service';
import { QuoteFields } from './const/quote-fields.select';


/// TODO: Refactor the Service class for better readability


@Injectable()
export class QuoteGeneratorService
{
    private readonly logger = new Logger(QuoteGeneratorService.name);

    constructor(
        private readonly httpService:          HttpService,
        private readonly configService:        ConfigService,
        private readonly prisma:               PrismaService,
        private readonly quoteVariableService: QuoteVariablesService 
    ) {}

    async create(quote_data: GetQuoteDTO)
    {
        const { from, to, ...data } = quote_data;
        const   estimation          = await this.estimate(quote_data);

        return this.prisma.quote.create({
            data: {
                ...data,
                ...estimation
            },
            select: QuoteFields
        });
    }

    find_all()
    {
        return this.prisma.quote.findMany();
    }

    async find_one(quote_id: string)
    {
        const quote = await this.prisma.quote.findUnique({
            where:  { quote_id }
        })

        if ( !quote )
            throw new NotFoundException(`Quite with id: '${quote_id}' was NOT FOUND`);
        
        return quote;
    }

    async update(quote_id: string, quote_data: GetQuoteDTO)
    {
        const quote      = await this.find_one(quote_id);
        const estimation = await this.estimate(quote_data);

        const { from, to, ...data } = quote_data

        return this.prisma.quote.update({
            where: { quote_id: quote.quote_id },
            data:  {
                ...quote,
                ...data,
                ...estimation,
            },
            select: QuoteFields
        })
    }

    async remove(quote_id: string)
    {
        const quote = await this.find_one(quote_id);

        return this.prisma.quote.delete({
            where: { quote_id: quote.quote_id },
            select: QuoteFields
        })
    }


    private get_discount_by_time(reservation: Reservation, exact_date: Date): number
    {
        if ( reservation && reservation === 'More Than 30 Days' )
            return -50;
        
        if ( (exact_date.getTime() - (new Date()).getTime()) > MORE_THAN_30_DAYS  )
            return -50;
        
        return 0;
    }


    private async estimate({ 
        from: { latitude: from_lat, longitude: from_long },
        to:   { latitude: to_lat,   longitude: to_long },
        is_enclosed,   is_operational, 
        reservation,   exact_date
    }: GetQuoteDTO)
    {
        const distance = await this.get_distance_in_miles(
            from_lat, from_long,
            to_lat,   to_long
        );

        const { 
            coefficient, power, 
            base_price,  inoperational_fee, enclosed_fee
        } = await this.quoteVariableService.get_current();

        let quote_estimate = 0;

        if ( is_enclosed )
            quote_estimate += enclosed_fee;
        
        if ( !is_operational )
            quote_estimate += inoperational_fee;
        
        quote_estimate += Math.max(
            base_price,
            Math.floor( coefficient * Math.pow(distance, power) / 10 ) * 10 - 1
        );

        quote_estimate += this.get_discount_by_time(reservation, exact_date);

        return {
            from_lat, from_long,
            to_lat,   to_long,
    
            quote_estimate,
            distance
        }
    }

    private async get_distance_in_miles(
        from_lat:  number,
        from_long: number,
        to_lat:    number,
        to_long:   number
    )
    {
        /// TODO: Refactor and move to the separate module
        /// Review `routePlanningLocations` at https://bit.ly/3Cdu9ET
        const locations = `${from_lat},${from_long}:${to_lat},${to_long}`;

        const { data } = await firstValueFrom(
            this.httpService.get<TomTomResponse>(
              `${TOMTOM_URL}/${locations}/${TOMTOM_CONTENT_TYPE}`,
                {
                    params: { 
                        key:                this.configService.get('TOMTOM_API_KEY'),
                        language:           TOMTOM_LANGUAGE,
                        vehicleCommercial: 'true'
                    } as TomTomDistanceRequest
                }
            )
            .pipe(
                catchError(
                    (error: AxiosError) =>
                    {
                        this.logger.error(error?.response?.data)
                        throw new InternalServerErrorException(
                            `Unable to obtain distance. Please, contact us directly!`
                        );
                    }
                )
            )
        );

        return Math.ceil(data.routes[0].summary.lengthInMeters / MI_TO_M);
    }
}