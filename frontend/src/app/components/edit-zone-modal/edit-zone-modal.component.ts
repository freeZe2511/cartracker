import { Component, OnInit } from '@angular/core';
import {ZoneClass} from "../../shared/models/zone";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-edit-zone-modal',
  templateUrl: './edit-zone-modal.component.html',
  styleUrls: ['./edit-zone-modal.component.css']
})
export class EditZoneModalComponent implements OnInit {

  public zone!: ZoneClass;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.zone.radius /= 1000;
  }

  save(): void {
    if(this.isNotEmpty(this.zone.name)) {
      this.zone.radius *= 1000;
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
