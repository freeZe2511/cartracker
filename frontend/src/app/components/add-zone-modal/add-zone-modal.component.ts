import {Component, OnInit} from '@angular/core';
import {UserWithoutPosition} from "../../shared/models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ZoneClass} from "../../shared/models/zone";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-add-zone-modal',
  templateUrl: './add-zone-modal.component.html',
  styleUrls: ['./add-zone-modal.component.css']
})
export class AddZoneModalComponent {

  public zone!: ZoneClass;

  constructor(public activeModal: NgbActiveModal, public _confirm: ConfirmService, public _alert: AlertsService) {
  }

  save(): void {
    if (this.isNotEmpty(this.zone.name)) {
      this._confirm.confirmDialog().then((res) => {
        if (res) {
          this.activeModal.close(this.zone);
        } else {
          this._alert.onCancel("Adding Zone cancelled");
        }
      });
    }
  }

  private isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    } else {
      return false;
    }
  }

}
