import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ZoneListComponent} from './zone-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatTableModule} from "@angular/material/table";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('ZoneListComponent', () => {
  let component: ZoneListComponent;
  let fixture: ComponentFixture<ZoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoneListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatTableModule, SimpleNotificationsModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display right column amount', () => {
    expect(component.displayedColumns).toEqual(['id', 'name', 'type', 'complexity', 'radius', 'actions']);
    expect(component.displayedColumns.length).toBe(6); // 7 with created
  })

});
