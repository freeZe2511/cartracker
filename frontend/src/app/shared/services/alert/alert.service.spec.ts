import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {SimpleNotificationsModule} from "angular2-notifications";

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimpleNotificationsModule.forRoot()]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be alert success', () => {
    service.onSuccess("Success");
    expect(service).toBeTruthy();
  });

  it('should be alert error', () => {
    service.onError("Error");
    expect(service).toBeTruthy();
  });

  it('should be alert leave', () => {
    service.onLeave("Leave");
    expect(service).toBeTruthy();
  });

  it('should be alert enter', () => {
    service.onEnter("Enter");
    expect(service).toBeTruthy();
  });

  it('should be alert cancel', () => {
    service.onCancel("Cancel");
    expect(service).toBeTruthy();
  });

  it('should be alert info', () => {
    service.onInfo("Info", "test info");
    expect(service).toBeTruthy();
  });
});
