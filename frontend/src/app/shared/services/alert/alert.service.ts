import {Injectable} from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private service: NotificationsService) {
  }

  /**
   * Display success alert
   * @param message
   */
  onSuccess(message: string) {
    this.service.success('Success', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  /**
   * Display error alert
   * @param message
   */
  onError(message: string) {
    this.service.error('Error', message, {
      position: ['top', 'center'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  /**
   * Display info alert
   * @param message
   * @param title
   */
  onInfo(title: string, message: string){
    this.service.info(title, message, {
      position: ['top', 'center'],
      timeOut: 4000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  /**
   * Display leave zone alert
   * @param message
   */
  onLeave(message: string) {
    this.service.info('User left', message, {
      position: ['top', 'center'],
      timeOut: 5000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  /**
   * Display enter zone alert
   * @param message
   */
  onEnter(message: string) {
    this.service.info('User entered', message, {
      position: ['top', 'center'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  /**
   * Display cancel alert
   * @param message
   */
  onCancel(message: string) {
    this.service.info('Cancelled', message, {
      position: ['top', 'center'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }
}
