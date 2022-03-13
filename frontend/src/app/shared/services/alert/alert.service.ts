import {Injectable} from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private service: NotificationsService) {
  }

  onSuccess(message: string) {
    this.service.success('Success', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: string) {
    this.service.error('Error', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onInfo(title: string, message: string){
    this.service.info(title, message, {
      position: ['top', 'center'],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onLeave(message: string) {
    this.service.info('User left', message, {
      position: ['top', 'center'],
      timeOut: 5000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onEnter(message: string) {
    this.service.info('User entered', message, {
      position: ['top', 'center'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onCancel(message: string) {
    this.service.info('Cancelled', message, {
      position: ['top', 'center'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }
}
