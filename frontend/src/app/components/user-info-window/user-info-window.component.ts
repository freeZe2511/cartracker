import {Component, OnInit} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar.service";
import {MapService} from "../../shared/services/map.service";
import {Route} from "../../shared/models/route";

@Component({
  selector: 'app-user-info-window',
  templateUrl: './user-info-window.component.html',
  styleUrls: ['./user-info-window.component.css']
})
export class UserInfoWindowComponent implements OnInit {
  public inputRouteTimeInHours!: HTMLInputElement;
  public inputRouteTimeInMinutes!: HTMLInputElement;

  constructor(public _sidebar: SidebarService, public _map: MapService) {
    this._sidebar.updateUserInfoWindowSettings(_map.centeredMarkerUserid!, _map.route);
  }

  ngOnInit(): void {
    this.inputRouteTimeInHours = document.getElementById("inputRouteTimeInHours") as HTMLInputElement;
    this.inputRouteTimeInMinutes = document.getElementById("inputRouteTimeInMinutes") as HTMLInputElement;
  }

  public setRouteSettings() {
    if (this._sidebar.userSettings.route) {
      this.updateRouteSettings()
      this._map.getRoutePositions();
    } else {
      this._map.route = undefined;
    }
  }

  public updateRouteSettings() {
    console.log("setting route...");
    let hours: string = (document.getElementById("inputRouteTimeInHours") as HTMLInputElement).value;
    let minutes: string = (document.getElementById("inputRouteTimeInMinutes") as HTMLInputElement).value;
    if (hours.match(/\d+/g) && minutes.match(/\d+/g)) {
      this._map.route = new Route(this._map.centeredMarkerUserid!, +hours, +minutes);
      console.log("ROUTE SET");
    }
  }
}
