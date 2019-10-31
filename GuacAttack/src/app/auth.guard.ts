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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private _snackBar: MatSnackBar) { }
  openSnackBar() {
    this._snackBar.open("Please sign in or register to continue", "OK", {duration: 3000});
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.auth.loginStatus){
      this.router.navigate(['login']);
      this.openSnackBar();
      return false;
    }
    return true;
  }
}
