import {Component} from '@angular/core';
import {UserWithoutPosition} from "../../shared/models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MapService} from "../../shared/services/map/map.service";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {

  public user!: UserWithoutPosition;

  constructor(public activeModal: NgbActiveModal, public _map: MapService, public _confirm: ConfirmService, public _alert: AlertsService) {
    this.user = new UserWithoutPosition('', '', '', '');

    _map.getZones();
  }

  save(): void {
    if (this.isNotEmpty(this.user.username) && this.isNotEmpty(this.user.password)) {
      this._confirm.confirmDialog().then((res) => {
        if (res) {
          this.activeModal.close(this.user);
        } else {
          this._alert.onCancel("Adding User cancelled");
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
