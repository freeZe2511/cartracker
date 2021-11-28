import { Injectable } from '@angular/core';
import {UserService} from "./users.service";
import {MapService} from "./map.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidebarIsOpened: boolean;
  public highlightedUser?: string;
  public openedZones: Array<string> = new Array<string>();

  constructor(private _user: UserService) {
    this.sidebarIsOpened = false;
  }

  public toggleSidebar() {
    this.sidebarIsOpened = !this.sidebarIsOpened;
  }

  public openSidebar() {
    this.sidebarIsOpened = true;
  }

  public closeSidebar() {
    this.sidebarIsOpened = false;
  }

  public openZone(zone: string) {
    this.openedZones.push(zone);
  }

  public closeZone(zone: string) {
    this.openedZones.splice(this.openedZones.indexOf(zone));
  }

  public highlightUser(userid: string) {
    this.highlightedUser = userid;
  }

  public unhighlightUser(userid: string) {
    this.highlightedUser = undefined;
  }
}
