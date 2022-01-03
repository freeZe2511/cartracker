import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarZoneCollapsedComponent } from './sidebar-zone-collapsed.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

describe('SidebarZoneCollapsedComponent', () => {
  let component: SidebarZoneCollapsedComponent;
  let fixture: ComponentFixture<SidebarZoneCollapsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarZoneCollapsedComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSelectModule, MatInputModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarZoneCollapsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
