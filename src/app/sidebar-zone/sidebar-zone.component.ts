import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../models/user";
import {SidebarService} from "../services/sidebar.service";
import {UserService} from "../services/users.service";
import {MapService} from "../services/map.service";
import {Zone} from "../models/zone";

@Component({
  selector: 'app-sidebar-zone',
  templateUrl: './sidebar-zone.component.html',
  styleUrls: ['./sidebar-zone.component.css']
})
export class SidebarZoneComponent implements OnInit {
  @Input() users!: User[];
  @Input() zone!: Zone;
  @Output("setCenteredMarker") setCenteredMarker: EventEmitter<any> = new EventEmitter();
  @Output("removeCenteredMarker") removeCenteredMarker: EventEmitter<any> = new EventEmitter();

  private clickedUserId: string | undefined;

  constructor(public _sidebar: SidebarService, public _user: UserService, public _map: MapService) { }

  ngOnInit(): void {
    this._user.initUserArray();

    this._user.updateUserArrayEverySecond();
  }

  public userClicked(userid: string) {
    if (this.clickedUserId) {
      if (this.clickedUserId == userid) {
        this.removeCenteredMarker.emit({userid});
      } else {
        this.clickedUserId = userid;
        this.setCenteredMarker.emit({userid});
      }
    } else {
      this.clickedUserId = userid;
      this.setCenteredMarker.emit({userid});
    }
  }

  public userClicked2(userid :string ) {
    if (userid == this._sidebar.highlightedUser) {
      this._map.unsetUserClicked(userid);
    } else {
      this._map.setUserClicked(userid);
    }
  }
}
