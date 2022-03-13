import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('UserService', () => {
  let service: UserService;
  let testUser = {
    id: "1",
    password: "test",
    username: "test1"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be create', () => {
    service.createUser(testUser);
    expect(service).toBeTruthy();
  });

  it('should be update', () => {
    service.updateUser(testUser);
    expect(service).toBeTruthy();
  });

  it('should be delete', () => {
    service.deleteUser(testUser.id);
    expect(service).toBeTruthy();
  });
});
