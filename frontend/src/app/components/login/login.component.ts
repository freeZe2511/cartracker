import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  logIn(username: string, password: string): void {
    // TODO
    if(username != "" && password != ""){
      this.authService.logIn(username, password)
    } else {
      this.alertService.onError("Login Error");
    }
  }

}
