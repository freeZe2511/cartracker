import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoneModalComponent } from './add-zone-modal.component';

describe('AddZoneModalComponent', () => {
  let component: AddZoneModalComponent;
  let fixture: ComponentFixture<AddZoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddZoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddZoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
