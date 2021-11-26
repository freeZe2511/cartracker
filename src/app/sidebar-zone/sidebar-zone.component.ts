import {Component, Input, OnInit} from '@angular/core';
import {User} from "../models/user";
import {SidebarService} from "../services/sidebar.service";
import {UserService} from "../services/users.service";

@Component({
  selector: 'app-sidebar-zone',
  templateUrl: './sidebar-zone.component.html',
  styleUrls: ['./sidebar-zone.component.css']
})
export class SidebarZoneComponent implements OnInit {
  @Input() users!: User[];
  @Input() zone!: string;

  constructor(public _sidebar: SidebarService, public _user: UserService) { }

  ngOnInit(): void {
  }

}
