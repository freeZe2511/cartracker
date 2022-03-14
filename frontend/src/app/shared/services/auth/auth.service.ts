import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  res: any;

  constructor(private httpService: HttpService, private router: Router, private alertService: AlertService) { }

  /**
   * Call HttpService post method for HTTP Post request
   * @param username
   * @param userPassword
   */
  postLogIn(username: string, userPassword: string){
    this.res = this.httpService.post(environment.backendURL + "auth/login", {
      username: username,
      password: userPassword
    });
  }

  /**
   * Determines login status based on http post response
   * @param username
   * @param userPassword
   */
  logIn(username: string, userPassword: string) {
    this.postLogIn(username, userPassword);
    this.res!.subscribe({
      next: (res: any) => {
        if(res["role"] == "admin"){
          this.setToken(JSON.stringify(res["jwt"]))
          this.router.navigate(["map"]);
        } else {
          this.alertService.onError("Not an Admin!");
        }
      },
      error: () => this.alertService.onError("Login Error"),
      complete: () => {}
    });
  }

  /**
   * Logout by navigating to login and clearing localstorage
   */
  logOut() {
    this.router.navigate(["login"]).then(() => localStorage.removeItem("idToken"));
  }

  /**
   * Set token in localstorage to later determine loggedin status
   * @param token
   */
  setToken(token: string){
    localStorage.setItem("idToken", token);
  }

  /**
   * Get token in localstorage to determine loggedin status
   */
  get isLoggedIn(): boolean {
    return (localStorage.getItem("idToken") !== null);
  }

  /**
   * Get token in localstorage
   */
  get token(): string {
    return localStorage.getItem("idToken")!;
  }

  /**
   * Prepare HTTP header with bearer token for HTTP post request
   */
  get authHeader(): string {
    return "Authorization: Bearer " + JSON.parse(<string>this.token);
  }
}
