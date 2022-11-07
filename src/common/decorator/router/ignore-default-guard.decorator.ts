import { SetMetadata } from "@nestjs/common";


export const IS_IGNORED = 'isIgnored';


export const IgnoreDefaultGuard = () => SetMetadata(IS_IGNORED, true);