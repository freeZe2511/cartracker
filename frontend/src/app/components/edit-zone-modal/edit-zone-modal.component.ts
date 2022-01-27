import { Component, OnInit } from '@angular/core';
import {ZoneClass} from "../../shared/models/zone";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-edit-zone-modal',
  templateUrl: './edit-zone-modal.component.html',
  styleUrls: ['./edit-zone-modal.component.css']
})
export class EditZoneModalComponent implements OnInit {

  public zone!: ZoneClass;

  constructor(public activeModal: NgbActiveModal, public _confirm: ConfirmService, public _alert: AlertsService) { }

  ngOnInit() {
    this.zone.radius /= 1000;
  }

  save(): void {
    if (this.isNotEmpty(this.zone.name)) {
      this._confirm.confirmDialog().then((res) => {
        if (res) {
          this.zone.radius *= 1000;
          this.activeModal.close(this.zone);
        } else {
          this._alert.onCancel("Adding Zone cancelled");
        }
      });
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
