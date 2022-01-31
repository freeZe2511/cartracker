import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarZoneComponent} from './sidebar-zone.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('SidebarZoneComponent', () => {
  let component: SidebarZoneComponent;
  let fixture: ComponentFixture<SidebarZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarZoneComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
