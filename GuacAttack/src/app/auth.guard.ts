import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";

import { AuthService } from "./services/auth.service";
import { tap, map, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
         take(1),
         map(user => !!user),
         tap(loggedIn => {
           if (!loggedIn) {
             console.log('access denied')
             this.router.navigate(['login']);
             return false;
            }
            return true;
       })
  )
}
}
