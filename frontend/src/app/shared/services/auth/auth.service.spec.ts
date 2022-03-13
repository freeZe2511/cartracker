import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {LoginComponent} from "../../../components/login/login.component";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: "login", component: LoginComponent}]
      ), SimpleNotificationsModule.forRoot()]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO
  it('should be login successfully', () => {
    expect(service).toBeTruthy();
  });

  it('should set token', () => {
    service.setToken("test");
    expect(service.token).toBe("test");
    localStorage.clear();
  });

  it('should get isLoggedIn', () => {
    expect(service.isLoggedIn).toBe(false);
    service.setToken("test");
    expect(service.isLoggedIn).toBe(true);
    localStorage.clear();
  });
});
