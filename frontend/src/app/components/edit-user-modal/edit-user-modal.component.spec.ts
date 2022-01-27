import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditUserModalComponent} from './edit-user-modal.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let fixture: ComponentFixture<EditUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
