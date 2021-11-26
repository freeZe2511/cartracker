import {Component, Input, OnInit} from '@angular/core';
import {SidebarService} from "../services/sidebar.service";

@Component({
  selector: 'app-sidebar-zone-collapsed',
  templateUrl: './sidebar-zone-collapsed.component.html',
  styleUrls: ['./sidebar-zone-collapsed.component.css']
})
export class SidebarZoneCollapsedComponent implements OnInit {
  @Input() zone!: string;

  constructor(public _sidebar: SidebarService) { }

  ngOnInit(): void {
  }

}
