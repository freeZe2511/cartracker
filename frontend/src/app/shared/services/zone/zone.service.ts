import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../http/http.service";
import {AuthService} from "../auth/auth.service";
import {Zone} from "../../models/zone";
import {AlertService} from "../alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private httpService: HttpService, private authService: AuthService, private alertService: AlertService) {
  }

  /**
   * Call httpService post to create zone with provided data
   * @param zone
   */
  public createZone(zone: Zone) {
    this.httpService.post(environment.backendURL + "api/v1/zone", {
      name: zone.name,
      radius: zone.radius,
      pos: zone.pos
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('Zone added');
      },
      // error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  /**
   * Call httpService put to update zone with provided data
   * @param zone
   */
  public updateZone(zone: Zone) {
    this.httpService.put(environment.backendURL + "api/v1/zone/" + zone.id, {
      name: zone.name,
      pos: zone.pos, // TODO zone
      radius: Number(zone.radius) * 1000
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('Zone changed');
      },
      error: (e) => {
        // console.error(e);
        this.alertService.onError('Failed editing Zone');
      },
      complete: () => console.info('complete')
    });
  }

  /**
   * Call httpService delete to create zone with zoneid
   * @param zoneid
   */
  public deleteZone(zoneid: string) {
    this.httpService.delete(environment.backendURL + "api/v1/zone/" + zoneid, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('Zone was deleted');
      },
      error: (e) => {
        // console.error(e);
        this.alertService.onError('Failed to delete Zone')
      },
      complete: () => console.info('complete')
    });
  }
}
