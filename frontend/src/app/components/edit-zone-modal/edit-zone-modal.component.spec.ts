import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZoneModalComponent } from './edit-zone-modal.component';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('EditZoneModalComponent', () => {
  let component: EditZoneModalComponent;
  let fixture: ComponentFixture<EditZoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditZoneModalComponent ],
      providers: [NgbActiveModal],
      imports: [SimpleNotificationsModule.forRoot()]
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
