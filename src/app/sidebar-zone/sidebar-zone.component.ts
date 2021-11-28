import {Component, Input, OnInit} from '@angular/core';
import {User} from "../models/user";
import {SidebarService} from "../services/sidebar.service";
import {UserService} from "../services/users.service";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-sidebar-zone',
  templateUrl: './sidebar-zone.component.html',
  styleUrls: ['./sidebar-zone.component.css']
})
export class SidebarZoneComponent implements OnInit {
  @Input() users!: User[];
  @Input() zone!: string;

  constructor(public _sidebar: SidebarService, public _user: UserService, public _map: MapService) { }

  ngOnInit(): void {
  }

  public userClicked(userid :string ) {
    if (userid == this._sidebar.highlightedUser) {
      this._map.unsetUserClicked(userid);
    } else {
      this._map.setUserClicked(userid);
    }
  }
}
