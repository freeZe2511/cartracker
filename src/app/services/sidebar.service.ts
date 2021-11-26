import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidebarIsOpened;
  public openedZones: Array<string> = new Array<string>();

  constructor() {
    this.sidebarIsOpened = false;
  }

  public toggleSidebar() {
    this.sidebarIsOpened = !this.sidebarIsOpened;
  }

  public openZone(zone: string) {
    this.openedZones.push(zone);
  }

  public closeZone(zone: string) {
    this.openedZones.splice(this.openedZones.indexOf(zone));
  }
}
