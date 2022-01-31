import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../shared/models/user";
import {SidebarService} from "../../shared/services/sidebar/sidebar.service";
import {UserService} from "../../shared/services/users/users.service";
import {MapService} from "../../shared/services/map/map.service";
import {Zone} from "../../shared/models/zone";

@Component({
  selector: 'app-sidebar-zone',
  templateUrl: './sidebar-zone.component.html',
  styleUrls: ['./sidebar-zone.component.css']
})
export class SidebarZoneComponent implements OnInit {
  @Input() users!: User[];
  @Input() zone!: Zone;
  @Output() setCenteredMarker: EventEmitter<any> = new EventEmitter();
  @Output() removeCenteredMarker: EventEmitter<any> = new EventEmitter();

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
