import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Route} from "../models/route";
import {UserService} from "./users.service";
import {Position, PositionClass, User} from "../models/user";
import {Zone, ZoneClass} from "../models/zone"
import {SidebarService} from "./sidebar.service";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  public markers: Map<string, google.maps.Marker> = new Map();
  public route?: Route;
  public centeredMarkerUserid: string | undefined;
  public keepCentered: boolean = false; //TODO: set if marker should be followed
  public allZone: Zone;
  public zones: Zone[];
  public zoneToDrawOnMap: Zone | undefined;
  public drawnZone: google.maps.Circle | google.maps.Polygon | undefined;

  constructor(private _http: HttpService, private _user: UserService, private _sidebar: SidebarService) {
    this.allZone = new ZoneClass("All", [], 0, "", "1");
    this.zones = [];
  }

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

  public createZone(zone: ZoneClass) {
    this._http.post("http://localhost:9090/api/v1/zone", {
      name: zone.name,
      radius: zone.radius,
      pos: [
        {
          lat: zone.pos[0].lat,
          lng: zone.pos[0].lng
        }
      ]
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public getZones() {
    this._http.get("http://localhost:9090/api/v1/zones").subscribe({
      next: (res: any) => {
        this.zones = res;
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
