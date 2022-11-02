import { ExecutionContext, createParamDecorator } from "@nestjs/common";

import { JwtPayload, RefreshToken } from "@common/interface";


export const GetUser = createParamDecorator(
    function(
        data:    keyof JwtPayload & RefreshToken, 
        context: ExecutionContext
    )
    {
        const request = context.switchToHttp().getRequest();

        if ( !data )
            return request.user;

        return request.user[data];
    }
);