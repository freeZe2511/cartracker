import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get', () => {
    let url = "test.de/test"
    let res = service.get(url);
    expect(res).toBeTruthy();
  });

  it('should be post', () => {
    let url = "test.de/test"
    let res = service.post(url, null);
    expect(res).toBeTruthy();
  });

  it('should be put', () => {
    let url = "test.de/test"
    let res = service.put(url, null);
    expect(res).toBeTruthy();
  });

  it('should be delete', () => {
    let url = "test.de/test"
    let res = service.delete(url);
    expect(res).toBeTruthy();
  });
});
