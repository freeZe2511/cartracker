import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {AlertsService} from "../alerts/alerts.service";
import {Zone} from "../../models/zone";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private _http: HttpService, private _alert: AlertsService, private authService: AuthService) {
  }

  public updateZone(zone: Zone) {
    this._http.put(environment.backendURL + "api/v1/zone/" + zone.id, {
      name: zone.name,
      pos: zone.pos, // TODO zone
      radius: zone.radius
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.onSuccess('Zone changed');
      },
      error: (e) => {
        console.error(e);
        this._alert.onError('Failed editing Zone');
      },
      complete: () => console.info('complete')
    });
  }

  public deleteZone(id: string) {
    this._http.delete(environment.backendURL + "api/v1/zone/" + id, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.onSuccess('Zone was deleted');
      },
      error: (e) => {
        console.error(e);
        this._alert.onError('Failed to delete Zone')
      },
      complete: () => console.info('complete')
    });
  }
}
