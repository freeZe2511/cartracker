import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display form', () => {
    let form: DebugElement = fixture.debugElement.query(By.css("form"));
    expect(form).toBeTruthy();
  });

  it('should display title', () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h2");
    expect(title.innerText).toMatch("Log In");
  });

  it('should display inputs', () => {
    let username: HTMLElement = fixture.nativeElement.querySelector("#loginUsername");
    let password: HTMLElement = fixture.nativeElement.querySelector("#loginPassword");
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('should display submit button', () => {
    let submit: DebugElement = fixture.debugElement.query(By.css("button"));
    expect(submit).toBeTruthy();
  });

  it('should click submit button', () => {
    let mock = spyOn(component, "logIn");
    let submitButton: DebugElement = fixture.debugElement.query(By.css(".btn-primary"));
    fixture.detectChanges();
    submitButton.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(mock).toHaveBeenCalledTimes(1);
  });

});
