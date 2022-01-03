import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserModalComponent } from './add-user-modal.component';
import {HttpService} from "../../shared/services/http.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserModalComponent ],
      providers: [HttpService, NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
