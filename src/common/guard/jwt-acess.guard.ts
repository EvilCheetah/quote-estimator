import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

import { CanActivate } from "@types";
import { IGNORE_DEFAULT_GUARD, IS_PUBLIC_KEY } from "@decorator";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access')
{
    constructor(private reflector: Reflector)
    {
        super()
    }

    canActivate(context: ExecutionContext): CanActivate
    {
        const isPublic           = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );

        const ignoreDefaultGuard = this.reflector.getAllAndOverride<boolean>(
            IGNORE_DEFAULT_GUARD,
            [context.getHandler(), context.getClass()]
        );

        if ( isPublic || ignoreDefaultGuard )
            return true;
        
        return super.canActivate(context);
    }
}