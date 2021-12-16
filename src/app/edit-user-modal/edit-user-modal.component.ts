import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../models/user";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit{
  public user!: User;
  public prevUserZone: string | undefined;

  constructor(public activeModal: NgbActiveModal, public _map: MapService) {
    _map.getZones();
  }

  ngOnInit() {
    this.prevUserZone = this.user!.zoneid;
  }

  save(): void {
    if(this.isNotEmpty(this.user.id) && this.isNotEmpty(this.user.username) && this.isNotEmpty(this.user.password)) {
      if (this.user.zoneid == "None") {
        this.user.zoneid = undefined;
      }
      this.activeModal.close(this.user);
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
