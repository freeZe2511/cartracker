import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MapComponent} from "../map/map.component";
import {of} from "rxjs";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

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
    latestPositions: []
  };

  const userServiceStub = {
    initUsers() {
      const users = [{
        id: "1",
        password: "test",
        username: "test1"
      }];

      return of(users);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: "map", component: MapComponent}]
      ), SimpleNotificationsModule.forRoot(),
        OverlayModule, MatDialogModule],
      // providers: [{ provide: UserService, useClass: userServiceStub }, MatDialog]
      providers: [MatDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should init users', () => {
  //   component.initUsers();
  //   expect(component.userService.users.length).toBe(1);
  // });

  it('should update users', () => {
    component.updateUsers();
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    component.add();
    expect(component).toBeTruthy();
  });

  it('should center user', () => {
    component.centerOnUser({
      id: "1",
      password: "test",
      username: "test1"
    });
    expect(component).toBeTruthy();
  });

  it('should edit', () => {
    component.edit({
      id: "1",
      password: "test",
      username: "test1"
    });
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    component.delete({
      id: "1",
      password: "test",
      username: "test1"
    });
    expect(component).toBeTruthy();
  });

  it('should return no pos', () => {
    let status = component.returnPos(testUser2)
    expect(status).toBe("No Pos");
  });

  it('should return status active', () => {
    let status = component.returnStatus(testUser1)
    expect(status).toBe("Active");
  });

  it('should return status no pos', () => {
    let status = component.returnStatus(testUser2)
    expect(status).toBe("No Pos");
  });

  it('should return status color', () => {
    let statusColor = component.returnStatusColor(testUser1)
    expect(statusColor).toBe("#67ce00");
  });

  it('should return status color', () => {
    let statusColor = component.returnStatusColor(testUser2)
    expect(statusColor).toBe("#ffa347");
  });

  it('should return zone color', () => {
    let statusColor = component.returnZoneColor(testUser1)
    expect(statusColor).toBe("#67ce00");
  });

  it('should return zone color', () => {
    let statusColor = component.returnZoneColor(testUser2)
    expect(statusColor).toBe("#111111");
  });

  it('should return pos latlng', () => {
    let pos = component.returnPos(testUser1)
    expect(pos).toBe("51.5252, 8.8");
  });


});
