import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintComponent } from './imprint.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    let title: DebugElement = fixture.debugElement.query(By.css("h1"));
    expect(title).toBeTruthy();
  });

  it('should display project name', () => {
    let name: DebugElement = fixture.debugElement.query(By.css("h2"));
    expect(name).toBeTruthy();
  });

  it('should display github link', () => {
    let link: DebugElement = fixture.debugElement.query(By.css("a"));
    expect(link).toBeTruthy();
  });
});


