import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display zone dropdown', () => {
    let dropdown: DebugElement = fixture.debugElement.query(By.css("#displayZoneDropdown"));
    expect(dropdown).toBeTruthy();
  });

  it('should display active users', () => {
    let active: DebugElement = fixture.debugElement.query(By.css("#active-users"));
    expect(active).toBeTruthy();
  });

  // it('should display user window', () => {
  //   let window: DebugElement = fixture.debugElement.query(By.css("#user-info-window"));
  //   expect(window).toBeTruthy();
  // });

});
