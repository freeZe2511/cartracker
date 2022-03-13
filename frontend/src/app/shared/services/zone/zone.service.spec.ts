import {TestBed} from '@angular/core/testing';

import {ZoneService} from './zone.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('ZoneService', () => {
  let service: ZoneService;
  let testZone = {
    id: "123",
    name: "test",
    radius: 0,
    pos: [{lat: 50.5, lng: 8.5}]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    });
    service = TestBed.inject(ZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be create', () => {
    service.createZone(testZone);
    expect(service).toBeTruthy();
  });

  it('should be update', () => {
    service.updateZone(testZone);
    expect(service).toBeTruthy();
  });

  it('should be delete', () => {
    service.deleteZone(testZone.id);
    expect(service).toBeTruthy();
  });
});
