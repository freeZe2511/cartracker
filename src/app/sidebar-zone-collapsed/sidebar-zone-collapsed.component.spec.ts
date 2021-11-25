import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarZoneCollapsedComponent } from './sidebar-zone-collapsed.component';

describe('SidebarZoneCollapsedComponent', () => {
  let component: SidebarZoneCollapsedComponent;
  let fixture: ComponentFixture<SidebarZoneCollapsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarZoneCollapsedComponent ]
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
