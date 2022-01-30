import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../services/auth/auth.service";
import {LoginComponent} from "../../components/login/login.component";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  //let authService: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: "sign-in", component: LoginComponent}
      ])]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate', () => {
    localStorage.setItem("idToken", JSON.stringify("TOKEN"));
    let res = guard.canActivate();
    expect(res).toBeTrue();
    localStorage.removeItem("idToken");
  });

  it('should not activate', () => {
    localStorage.removeItem("idToken");
    let res = guard.canActivate();
    expect(res).toBeFalse();
  });

});
