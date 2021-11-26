import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {SidebarService} from "../services/sidebar.service";
import {UserService} from "../services/users.service";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public _user: UserService) {
  }

  ngOnInit(): void {
  }

}
