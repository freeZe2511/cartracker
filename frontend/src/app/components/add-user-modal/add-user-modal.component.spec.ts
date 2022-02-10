import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddUserModalComponent} from './add-user-modal.component';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SimpleNotificationsModule} from "angular2-notifications";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

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

  it('should display title', () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h4");
    expect(title.innerText).toMatch("Add A New User");
  });

  it('should click Save button', () => {
    let mock = spyOn(component, "save");
    let submitButton: DebugElement = fixture.debugElement.query(By.css(".btn-success"));
    fixture.detectChanges();
    submitButton.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(mock).toHaveBeenCalledTimes(1);
  });

});
