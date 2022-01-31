import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapComponent} from './map.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
