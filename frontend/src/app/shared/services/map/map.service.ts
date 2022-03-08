import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {Route} from "../../models/route";
import {UserService} from "../users/users.service";
import {Position} from "../../models/user";
import {Zone, ZoneClass} from "../../models/zone"
import {SidebarService} from "../sidebar/sidebar.service";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {AlertsService} from "../alerts/alerts.service";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  public markers: Map<string, google.maps.Marker> = new Map();
  public route?: Route;
  public centeredMarkerUserid: string | undefined;
  public keepMarkerCentered: boolean = false;
  public allZone: Zone;
  public noneZone: Zone;
  public zones: Zone[];

  constructor(private _http: HttpService, private _user: UserService, private _sidebar: SidebarService, private authService: AuthService, private _alert: AlertsService) {
    this.allZone = new ZoneClass("All", [], 0);
    this.noneZone = new ZoneClass("None", [], 0, "", "1");
    this.zones = [];
  }

  public getRoutePositions(): any {
    if (this.route) {
      let data: string = this.route!.userid + "&&" + this.route!.timeInHours + "&&" + this.route!.timeInMinutes;
      this._http.get(environment.backendURL + "api/v1/route/" + data, {headers: this.authService.authHeader}).subscribe({
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
    return this._http.get(environment.backendURL + "api/v1/pos", {headers: this.authService.authHeader});
  }

  public createZone(zone: ZoneClass) {
    this._http.post(environment.backendURL + "api/v1/zone", {
      name: zone.name,
      radius: zone.radius,
      pos: [
        {
          lat: zone.pos[0].lat,
          lng: zone.pos[0].lng
        }
      ]
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.onSuccess('Zone added');
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public getZones() {
    this._http.get(environment.backendURL + "api/v1/zones", {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        this.zones = res;
        this.zones.unshift(this.noneZone);
        this.zones.unshift(this.allZone);
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete loading zones')
    });
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
    this.keepMarkerCentered = true;
    this._sidebar.openSidebar();
    this._sidebar.highlightUser(userid);
  }

  public unsetUserClicked(userid: string) {
    this.markers.get(userid)!.addListener('click', () => this.setUserClicked(userid));
    this.centeredMarkerUserid = undefined;
    this.keepMarkerCentered = false;
    this._sidebar.closeSidebar();
    this._sidebar.unhighlightUser(userid);
  }

}
