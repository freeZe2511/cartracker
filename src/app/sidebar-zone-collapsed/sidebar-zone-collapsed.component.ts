import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-zone-collapsed',
  templateUrl: './sidebar-zone-collapsed.component.html',
  styleUrls: ['./sidebar-zone-collapsed.component.css']
})
export class SidebarZoneCollapsedComponent implements OnInit {
  @Input() users: any;

  constructor() { }

  ngOnInit(): void {
  }

}
