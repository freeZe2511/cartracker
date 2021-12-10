import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Route} from "../models/route";
import {UserService} from "./users.service";
import {Position, PositionClass, User} from "../models/user";
import {SidebarService} from "./sidebar.service";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  public markers: Map<string, google.maps.Marker> = new Map();
  public route?: Route;
  public centeredMarkerUserid: string | undefined;
  public keepCentered: boolean = false; //TODO: set if marker should be followed

  constructor(private _http: HttpService, private _user: UserService, private _sidebar: SidebarService) { }

  public getRoutePositions(): any {
    if (this.route) {
      let data: string = this.route!.userid + "&&" + this.route!.timeInHours + "&&" + this.route!.timeInMinutes;
      this._http.get("http://localhost:9090/api/v1/route/" + data).subscribe({
        next: (res: any) => {
          this.route!.positions = res;
          return res;
        },
        error: (e) => this.route = undefined,
        complete: () => console.info('complete')
      });
    }
  }

  public getUserPositions(): any {
    return this._http.get("http://localhost:9090/api/v1/map/1");
  }

  public centerOnMarker(userid: string, pos: Position) {
    if (pos) {
      this.centeredMarkerUserid = userid;
    }
  }

  public setUserClicked(userid: string) {
    if (this.centeredMarkerUserid) {
      let olduserid: string = this.centeredMarkerUserid;
      this.markers.get(olduserid)!.addListener('click', () => this.setUserClicked(olduserid));
    }
    this.markers.get(userid)!.addListener('click', () => this.unsetUserClicked(userid));
    this.centeredMarkerUserid = userid;
    this._sidebar.updateUserInfoWindowSettings(userid, this.route);
    this.keepCentered = true;
    this._sidebar.openSidebar();
    this._sidebar.highlightUser(userid);
  }

  public unsetUserClicked(userid: string) {
    this.markers.get(userid)!.addListener('click', () => this.setUserClicked(userid));
    this.centeredMarkerUserid = undefined;
    this.keepCentered = false;
    this._sidebar.closeSidebar();
    this._sidebar.unhighlightUser(userid);
  }

}
