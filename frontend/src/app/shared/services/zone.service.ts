import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {AuthService} from "./auth.service";
import {Zone} from "../models/zone";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private httpService: HttpService, private authService: AuthService) {
  }

  public updateZone(zone: Zone) {
    this.httpService.put("http://localhost:9090/api/v1/zone/" + zone.id, {
      name: zone.name,
      pos: zone.pos,
      radius: zone.radius
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public deleteZone(id: string) {
    this.httpService.delete("http://localhost:9090/api/v1/zone/" + id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
