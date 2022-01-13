import { Component } from '@angular/core';
import {User} from "../../shared/models/user";
import {Zone} from "../../shared/models/zone";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MapService} from "../../shared/services/map.service";

@Component({
  selector: 'app-edit-zone-modal',
  templateUrl: './edit-zone-modal.component.html',
  styleUrls: ['./edit-zone-modal.component.css']
})
export class EditZoneModalComponent {

  public zone!: Zone;

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    if(this.isNotEmpty(this.zone.id) && this.isNotEmpty(this.zone.name)) {
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
