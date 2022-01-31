import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../shared/services/auth/auth.service";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: "sign-in", component: LoginComponent}
      ])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    let brand: DebugElement = fixture.debugElement.query(By.css(".navbar-brand"));
    expect(brand).toBeTruthy();
  });

  it('should display navigation', () => {
    let navigation: DebugElement = fixture.debugElement.query(By.css(".navbar-nav"));
    expect(navigation).toBeTruthy();
  });

  it('should display imprint', () => {
    let imprintBtn: DebugElement = fixture.debugElement.query(By.css("#imprintBtn"));
    expect(imprintBtn).toBeTruthy();
  });

  it('should display logOut', () => {
    let logOutBtn: DebugElement = fixture.debugElement.query(By.css("#logOutBtn"));
    expect(logOutBtn).toBeTruthy();
  });

  // TODO to sign in page?
  it('should click logOut Button', () => {
    let mock = spyOn(component, "logOut");
    let submitButton: DebugElement = fixture.debugElement.query(By.css("#logOutBtn"));
    fixture.detectChanges();
    submitButton.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(mock).toHaveBeenCalledTimes(1);
  });

});
