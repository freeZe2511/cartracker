import {Component, Input, OnInit} from '@angular/core';
import {SidebarService} from "../../shared/services/sidebar/sidebar.service";
import {Zone} from "../../shared/models/zone";

@Component({
  selector: 'app-sidebar-zone-collapsed',
  templateUrl: './sidebar-zone-collapsed.component.html',
  styleUrls: ['./sidebar-zone-collapsed.component.css']
})
export class SidebarZoneCollapsedComponent implements OnInit {
  @Input() zone?: Zone;

  constructor(public _sidebar: SidebarService) { }

  ngOnInit(): void {
  }

}
