import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";

import { JwtPayload } from "@common/interface";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
{
    constructor(
        private readonly configService: ConfigService,
        private readonly authService:   AuthService
    )
    {
        super({
            jwtFromRequest:    ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            ingnoreExpiration: false,
            secretOrKey:       configService.get('JWT_REFRESH_TOKEN_SECRET'),
        })
    }

    validate(request: Request, validation_payload: JwtPayload)
    {
        const refresh_token = request.get('Authorization')?.replace('Bearer', '').trim();

        if ( !refresh_token )
            throw new ForbiddenException(`Unable to obtain refresh token`);
        
        const user = this.authService.validateRefreshToken(validation_payload.sub, refresh_token);

        if ( !user )
            throw new UnauthorizedException(`Access denied`);

        return user;
    }
}