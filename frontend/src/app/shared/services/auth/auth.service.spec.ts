import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {
    expect(service.token).toBeNull();
    service.logIn("test", "test123");
    // TODO
  })

  it('should be logged in', () => {
    localStorage.setItem("idToken", JSON.stringify("TOKEN")); //TODO be set in logIn test
    expect(service.isLoggedIn).toBeTrue();
  })

  it('should log out', () => {
    expect(service.token).toBeDefined();
    service.logOut();
    expect(service.token).toBeNull();
  })

});
