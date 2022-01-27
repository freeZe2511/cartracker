import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddUserModalComponent} from './add-user-modal.component';
import {HttpService} from "../../shared/services/http/http.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SimpleNotificationsModule.forRoot()],
      providers: [NgbActiveModal]
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
