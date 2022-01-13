import { Injectable } from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private service: NotificationsService) { }

  onSuccess(message: String) {
    this.service.success('Success', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: String) {
    this.service.error('Error', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }
}
