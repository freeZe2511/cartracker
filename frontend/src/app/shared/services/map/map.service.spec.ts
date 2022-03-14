import {TestBed} from '@angular/core/testing';

import {MapService} from './map.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import * as L from 'leaflet';
import {expect} from "@angular/flex-layout/_private-utils/testing";

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

  it("init userPositions", () => {
    service.initUserPositions();
    expect(service).toBeTruthy();
  })

  it("", () => {
    service.addCircleZoneRadiusCircle(10);
  })

  it("new marker", () => {
    let res = service.isNewMarker(testUser1);
    expect(res).toBe(true);
  })

  it("no marker", () => {
    let res = service.isNewMarker(testUser2);
    expect(res).toBe(false);
  })

  it("not new marker", () => {
    service.markers.set(testUser1.id, L.circleMarker([testUser1.latestPositions[0].lat, testUser1.latestPositions[0].lng]))
    let res = service.isNewMarker(testUser1);
    expect(res).toBe(false);
  })

  it("reset data", () => {
    service.showZonesBool = true;
    expect(service.showZonesBool).toBe(true);
    service.resetDataMaps('u');
    expect(service.showZonesBool).toBe(false);
  })

  it("center marker", () => {
    service.follows.set(testUser1.id, true);
    // service.users.push(testUser1);
    service.centerMarker();
    expect(service).toBeTruthy();
  })

  it("center zone", () => {
    service.centers.set(testUser1.id, true);
    // service.users.push(testUser1);
    service.centerZone();
    expect(service).toBeTruthy();
  });

  it("show route", () => {
    service.showUserRoute(testUser1, true);
    expect(service.showRoute.get(testUser1.id)).toBe(true);
  })

  it("not show route", () => {
    service.routesMap.set(testUser1.id, undefined);
    service.showUserRoute(testUser1, false);
    expect(service.showRoute.get(testUser1.id)).toBe(false);
  })

  it("toggle circle zone", () => {
    service.toggleCircleZone(false);
    expect(service.addCircleZone).toBe(false);
  })

  it("toggle poly zone", () => {
    service.togglePolyZone(false);
    expect(service.addPolyZone).toBe(false);
  })

  it("show all zones", () => {
    service.showZone.set("test", false);
    service.showAllZones(true);
    expect(service).toBeTruthy();
  })

  it("show all zones", () => {
    service.showUserRoute(testUser1,true);
    expect(service).toBeTruthy();
  })

  // it("center poly zone", () => {
  //   service.centerPolyZone({
  //     id: "11",
  //     radius: 0,
  //     name: "test",
  //     pos: [{
  //       lat: 50,
  //       lng: 8
  //     },
  //       {
  //         lat: 51,
  //         lng: 8
  //       },
  //       {
  //         lat: 52,
  //         lng: 8
  //       },
  //       {
  //         lat: 53,
  //         lng: 8
  //       }]
  //   });
  //   expect(service).toBeTruthy();
  // })


});
