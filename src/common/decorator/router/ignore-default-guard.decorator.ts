import { SetMetadata } from "@nestjs/common";


export const IGNORE_DEFAULT_GUARD = 'isIgnored';


export const IgnoreDefaultGuard = () => SetMetadata(IGNORE_DEFAULT_GUARD, true);