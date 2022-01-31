import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../../../components/login/login.component";
import {Router} from "@angular/router";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: "sign-in", component: LoginComponent}
      ])]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {
    // TODO
    // localStorage.removeItem("idToken");
    // expect(service.token).toBeNull();
    //service.logIn("test", "test123");
    expect(true).toBeTrue();
  })

  it('should be logged in', () => {
    localStorage.setItem("idToken", JSON.stringify("TOKEN")); //TODO be set in logIn test
    expect(service.isLoggedIn).toBeTrue();
  })

  it('should log out', () => {
    expect(service.token).toBeDefined();
    service.logOut();
    expect(service.token).toBeNull();
    //let spy1 = spyOn(service.router, 'navigate')
    //expect(spy1).toHaveBeenCalledWith(["sign-in"])
  })

});
