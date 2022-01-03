import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar.service";
import {UserService} from "../../shared/services/users.service";
import {MapService} from "../../shared/services/map.service";
import {Zone} from "../../shared/models/zone";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() drawZone: EventEmitter<any> = new EventEmitter();
  @Output() setCenteredMarker: EventEmitter<any> = new EventEmitter();
  @Output() removeCenteredMarker: EventEmitter<any> = new EventEmitter();


  public selectedZone: Zone | undefined;

  constructor(public _sidebar: SidebarService, public _user: UserService, public _map: MapService) {
  }

  ngOnInit(): void {
  }

}
