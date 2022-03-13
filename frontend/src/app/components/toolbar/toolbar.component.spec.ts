import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarComponent} from './toolbar.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {LoginComponent} from "../login/login.component";

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{path: "login", component: LoginComponent}]
      ), SimpleNotificationsModule.forRoot()]
    })
      .compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logOut();
    expect(component).toBeTruthy();
    localStorage.clear();
  });
});
