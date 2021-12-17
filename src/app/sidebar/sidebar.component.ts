import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output("drawZone") drawZone: EventEmitter<any> = new EventEmitter();

  public selectedZone: Zone | undefined;

  constructor(public _sidebar: SidebarService, public _user: UserService, public _map: MapService) {
  }

  ngOnInit(): void {
  }

}
