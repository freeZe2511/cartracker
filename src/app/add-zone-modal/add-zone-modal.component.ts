import { Component, OnInit } from '@angular/core';
import {UserWithoutPosition} from "../models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ZoneClass} from "../models/zone";

@Component({
  selector: 'app-add-zone-modal',
  templateUrl: './add-zone-modal.component.html',
  styleUrls: ['./add-zone-modal.component.css']
})
export class AddZoneModalComponent {

  public zone!: ZoneClass;

  constructor(public activeModal: NgbActiveModal) { }

  save(): void {
    if(this.isNotEmpty(this.zone.name)) {
      this.activeModal.close(this.zone);
    }
  }

  private isNotEmpty(str?: string) {
    if(str != undefined) {
      return str.trim().length > 0;
    } else {
      return false;
    }
  }

}
