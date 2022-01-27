import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoneModalComponent } from './edit-zone-modal.component';

describe('EditZoneModalComponent', () => {
  let component: EditZoneModalComponent;
  let fixture: ComponentFixture<EditZoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditZoneModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditZoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
