import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

import { CanActivate } from "@common/types";
import { IS_PUBLIC_KEY } from "@common/decorator";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access')
{
    constructor(private reflector: Reflector)
    {
        super()
    }

    canActivate(context: ExecutionContext): CanActivate
    {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (isPublic)
            return true;
        
        return super.canActivate(context);
    }
}