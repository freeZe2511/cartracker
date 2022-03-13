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

  postLogIn(username: string, userPassword: string){
    this.res = this.httpService.post(environment.backendURL + "auth/login", {
      username: username,
      password: userPassword
    });
  }

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

  logOut() {
    this.router.navigate(["login"]).then(() => localStorage.removeItem("idToken"));
  }

  setToken(token: string){
    localStorage.setItem("idToken", token);
  }

  get isLoggedIn(): boolean {
    return (localStorage.getItem("idToken") !== null);
  }

  get token(): string {
    return localStorage.getItem("idToken")!;
  }

  get authHeader(): string {
    return "Authorization: Bearer " + JSON.parse(<string>this.token);
  }
}
