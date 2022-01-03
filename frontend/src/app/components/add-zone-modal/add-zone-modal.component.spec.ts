import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddZoneModalComponent} from './add-zone-modal.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('AddZoneModalComponent', () => {
  let component: AddZoneModalComponent;
  let fixture: ComponentFixture<AddZoneModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddZoneModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NgbActiveModal]
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
