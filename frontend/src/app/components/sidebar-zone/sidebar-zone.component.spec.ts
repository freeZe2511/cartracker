import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarZoneComponent } from './sidebar-zone.component';

describe('SidebarZoneComponent', () => {
  let component: SidebarZoneComponent;
  let fixture: ComponentFixture<SidebarZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
