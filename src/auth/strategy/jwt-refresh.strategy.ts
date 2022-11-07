import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";

import { JwtPayload } from "@common/interface";


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
{
    constructor(configService: ConfigService)
    {
        super({
            jwtFromRequest:    ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingnoreExpiration: false,
            secretOrKey:       configService.get('JWT_REFRESH_TOKEN_SECRET')
        })
    }

    validate(request: Request, validation_payload: JwtPayload)
    {
        const refresh_token = request?.get('authorization')?.replace('Bearer', '').trim();

        if ( !refresh_token )
            throw new ForbiddenException(`Unable to obtain refresh token`);
        
        return { ...validation_payload, refresh_token };
    }
}