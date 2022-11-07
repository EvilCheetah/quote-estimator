import { Observable } from "rxjs";


export type CanActivate = boolean | Promise<boolean> | Observable<boolean>