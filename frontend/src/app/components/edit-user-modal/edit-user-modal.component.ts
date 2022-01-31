import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user";
import {MapService} from "../../shared/services/map/map.service";
import {Zone, ZoneClass} from "../../shared/models/zone"
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertsService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit{
  public user!: User;
  public prevUserZone!: Zone;

  constructor(public activeModal: NgbActiveModal, public _map: MapService, public _confirm: ConfirmService, public _alert: AlertsService) {
    _map.getZones();
  }

  ngOnInit() {
    this.prevUserZone = this.findZoneByID(this.user!.zoneid!)!; //TODO refactor?
  }

  save(): void {
    if (this.isNotEmpty(this.user.username) && this.isNotEmpty(this.user.password)) {
      this._confirm.confirmDialog().then((res) => {
        if (res) {
          if (this.user.zoneid == "None") {
            this.user.zoneid = undefined;
          }
          this.activeModal.close(this.user);
        } else {
          this._alert.onCancel("Editin User cancelled");
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

  private findZoneByID(zoneid: string){
    return this._map.zones.find(z => z.id === zoneid);
  }

}
