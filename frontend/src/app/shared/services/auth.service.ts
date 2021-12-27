import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpService: HttpService, public router: Router) {
  }

  logIn(username: string, userPassword: string) {
    this.httpService.post("http://localhost:9090/api/v1/login", {
      uniqueX: username,
      password: userPassword, //TODO hash + salt
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem("idToken", JSON.stringify(res));
        this.router.navigate(["home"]);
      },
      error: (e) => window.alert("login fail"),
      complete: () => console.info('complete')
    });

  }

  logOut() {
    localStorage.removeItem("idToken");
    this.router.navigate(["sign-in"]);
  }

  get isLoggedIn(): boolean {
    const idToken = JSON.parse(<string>localStorage.getItem("idToken"));
    return (idToken !== null);
  }

  get token(): string {
    return JSON.parse(<string>localStorage.getItem("idToken"));
  }
}
