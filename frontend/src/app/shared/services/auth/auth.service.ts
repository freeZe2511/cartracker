import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpService: HttpService, public router: Router) {
  }

  logIn(username: string, userPassword: string) {
    this.httpService.post(environment.backendURL + "auth/login", {
      uniqueX: username,
      password: userPassword
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem("idToken", JSON.stringify(res));
        this.router.navigate(["home"]);
      },
      error: () => window.alert("login fail"),
      complete: () => console.info('complete')
    });
  }

  async logOut() {
    localStorage.removeItem("idToken");
    await this.router.navigate(["sign-in"]);
  }

  get isLoggedIn(): boolean {
    const idToken = JSON.parse(<string>localStorage.getItem("idToken"));
    return (idToken !== null);
  }

  get token(): string {
    return JSON.parse(<string>localStorage.getItem("idToken"));
  }

  get authHeader(): string {
    return "Authorization: Bearer " + this.token;
  }

  print(test: string){
    console.log(test)
  }
}
