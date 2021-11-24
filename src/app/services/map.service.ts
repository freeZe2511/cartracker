import {Injectable, ViewChild} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";
import {firstValueFrom, Observable} from "rxjs";
import MapOptions = google.maps.MapOptions;
import {MapComponent} from "../map/map.component";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  public markers: Map<string, google.maps.Marker> = new Map();

  constructor(private httpService: HttpService) {
  }

  getUserPositions2(): Promise<User[]> {
    return firstValueFrom(this.httpService.get("http://localhost:9090/api/v1/map/1"));
  }

  getUserPositions(): any {
    return this.httpService.get("http://localhost:9090/api/v1/map/1");
  }
  public centerOnMarker(userid: string) {
    if (this.markers.has(userid)) {
      console.log(this.mapComponent);
      this.mapComponent.mapOptions.center = this.markers.get(userid)!.getPosition();
    }
  }


  // handleData(data: any): void {
  //   for (const user of data) {
  //     this._users.push(new User(user["id"], user["username"], user["latest-positions"][0]))
  //   }
  //   console.log(this._users)
  // }

  // getX(): Promise<User[]> {
  //   return  firstValueFrom(this.httpService.getCurrentUserPos());
  // }

  // getOne(): Observable<User> {
  //   return this.http.get<User>("http://localhost:9090/api/v1/admin/map/user/378bf7c9-367d-4928-b089-6269840ad540&5");
  // }



  // get users(): User[] {
  //   return this._users;
  // }






}
