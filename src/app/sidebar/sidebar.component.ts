import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SidebarService} from "../services/sidebar.service";
import {UserService} from "../services/users.service";
import {MapService} from "../services/map.service";
import {Zone} from "../models/zone";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public selectedZone: Zone | undefined;

  constructor(public _sidebar: SidebarService, public _user: UserService, public _map: MapService) {
  }

  ngOnInit(): void {
  }

  public setSelectedZone() {
    this._map.zoneToDrawOnMap = this.selectedZone;
    if (this._map.drawnZone) {
      this._map.drawnZone.setMap(null);
    }
  }

}
