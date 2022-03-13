import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ZoneListComponent} from './zone-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {OverlayModule} from "@angular/cdk/overlay";
import {MapComponent} from "../map/map.component";

describe('ZoneListComponent', () => {
  let component: ZoneListComponent;
  let mapComponent: ComponentFixture<MapComponent>;
  let fixture: ComponentFixture<ZoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoneListComponent, MapComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: "map", component: MapComponent}]
      ), SimpleNotificationsModule.forRoot(),
      OverlayModule, MatDialogModule],
      providers: [MatDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mapComponent = TestBed.createComponent(MapComponent);
    fixture = TestBed.createComponent(ZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    component.add();
    expect(component).toBeTruthy();
  });

  it('should center zone', () => {
    component.centerOnZone({
      name: "test",
      radius: 0,
      pos: []
    });
    expect(component).toBeTruthy();
  });

  it('should edit', () => {
    component.edit({
      name: "test",
      radius: 0,
      pos: []
    });
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    component.delete({
      name: "test",
      radius: 0,
      pos: []
    });
    expect(component).toBeTruthy();
  });
});
