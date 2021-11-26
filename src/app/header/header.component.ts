import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../services/sidebar.service";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public _navigation: NavigationService) { }

  ngOnInit(): void {
  }

}
