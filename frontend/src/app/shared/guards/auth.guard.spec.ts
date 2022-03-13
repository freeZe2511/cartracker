import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {LoginComponent} from "../../components/login/login.component";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: 'login', component: LoginComponent}]
      ), SimpleNotificationsModule.forRoot()]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('can activate', () => {
    localStorage.setItem("idToken", "token");
    let res = guard.canActivate();
    expect(res).toBe(true);
    localStorage.clear();
  });

  it('can`t activate', () => {
    let res = guard.canActivate();
    expect(res).toBe(true);
    localStorage.clear();
  });
});
