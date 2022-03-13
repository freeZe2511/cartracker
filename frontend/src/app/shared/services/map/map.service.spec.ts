import {TestBed} from '@angular/core/testing';

import {MapService} from './map.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('MapService', () => {
  let service: MapService;
  let testUser1 = {
    id: "1",
    password: "test",
    username: "test1",
    latestPositions: [
      {
        _id: "622bb2f11373abc506ef1b70",
        id: "2038a49b-e7d0-4447-b31b-59f7fe10602c",
        lat: 51.5252,
        lng: 8.8,
        inZone: true,
        speed: 10,
        isMoving: true
      }
    ]
  };

  let testUser2 = {
    id: "1",
    password: "test",
    username: "test1",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user route', () => {
    service.getUserRoute(testUser1, 1, 0);
    expect(service).toBeTruthy();
  });

  // it('should add new marker', () => {
  //   service.addNewMarker(testUser1);
  //   expect(service).toBeTruthy();
  // });

  it('should not add new marker', () => {
    service.addNewMarker(testUser2);
    expect(service).toBeTruthy();
  });
});
