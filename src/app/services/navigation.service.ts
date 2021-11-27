import { Injectable } from '@angular/core';
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public currentPage!: string;

  constructor(private _map: MapService) {
    this.goToHome();
  }

  public goToHome() {
    this.currentPage = "home";
    // for(let markers of this._map.markers) {
    //   markers[1].setMap(null);
    // }
    // this._map.markers.clear();
  }

  public goToUsers() {
    this.currentPage = "users";
  }
}
