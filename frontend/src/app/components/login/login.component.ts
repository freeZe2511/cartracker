import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public _alert: AlertsService) { }

  ngOnInit(): void {
  }

  logIn(username: string, password: string): void {
    if(username != "" && password != ""){
      this.authService.logIn(username, password)
    }else {
      this._alert.onError("Please enter Username and/or Password"); // TODO not working???
    }

  }

}
