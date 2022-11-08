import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload, RefreshToken } from "@interface";


export const GetUser = createParamDecorator(
    function(
        data:    (keyof (JwtPayload & RefreshToken)), 
        context: ExecutionContext
    )
    {
        const request = context.switchToHttp().getRequest();
        const user    = request.user;

        if ( !( data && (data in user) ) )
            return user;

        return user[data];
    }
);