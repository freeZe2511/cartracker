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

  constructor(private _http: HttpService, private _user: UserService, private _sidebar: SidebarService) {
    this.route =
      new Route("bb371c0c-c705-40b3-8a07-795b2a62d9a5", 0, 15, this.hardCodedPositions());
  }

  // public getRoutePositions(): any {
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

  public setUserClicked(userid: string) {
    if (this.centeredMarkerUserid) {
      let olduserid: string = this.centeredMarkerUserid;
      this.markers.get(olduserid)!.addListener('click', () => this.setUserClicked(olduserid));
    }
    this.markers.get(userid)!.addListener('click', () => this.unsetUserClicked(userid));
    this.centeredMarkerUserid = userid;
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

  private hardCodedPositions(): Position[]{
    return [
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.45, 8.4),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.45, 8.41),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.45, 8.42),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.45, 8.44),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.45, 8.46),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.5, 8.47),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.52, 8.5),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.53, 8.52),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.56, 8.55),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.54, 8.55),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.42, 8.55),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.4, 8.55),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.37, 8.53),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.36, 8.5),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.34, 8.5),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.32, 8.5),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.3, 8.5),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.3, 8.48),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.3, 8.47),
      new PositionClass("testing", "24f60449-91ce-471c-896e-40db08987f3a", 50.3, 8.43),
    ]
  }

}
