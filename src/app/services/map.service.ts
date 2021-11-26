import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Route} from "../models/route";
import {UserService} from "./users.service";
import {Position, User} from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  public markers: Map<string, google.maps.Marker> = new Map();
  public route?: Route;
  public centeredMarkerUserid: string | undefined;
  public keepCentered: boolean = false; //TODO: set if marker should be followed

  constructor(private _http: HttpService, private _user: UserService) {
    this.route = new Route("bb371c0c-c705-40b3-8a07-795b2a62d9a5", 0, 15);
  }

  // public getRoute(): any {
  //   this.httpService.get("http://localhost:9090/api/v1/route").subscribe({
  //     next: (res: any) => {
  //       return res;
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => console.info('complete')
  //   });
  // }

  public getUserPositions(): any {
    return this._http.get("http://localhost:9090/api/v1/map/1");
  }

  public centerOnMarker(userid: string, pos: Position) {
    if (pos) {
      this.centeredMarkerUserid = userid;
    }
  }

}
