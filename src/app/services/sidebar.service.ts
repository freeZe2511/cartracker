import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sidebarIsOpened;

  constructor() {
    this.sidebarIsOpened = false;
  }

  public toggleSidebar() {
    this.sidebarIsOpened = !this.sidebarIsOpened;
  }
}
