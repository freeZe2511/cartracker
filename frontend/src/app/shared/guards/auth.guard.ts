import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router:Router) {
  }

  /**
   * Determines user logged in status to en-/disable navigation
   */
  canActivate(): any {
    if (!this._auth.isLoggedIn) {
      console.log("not logged in");
      this._router.navigate(["login"]).then(() => {
        return false;
      });
    }
    return true;
  }

}
