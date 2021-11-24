import { Component, OnInit } from '@angular/core';
import {User, UserWithoutPosition} from "../models/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent{

  public user!: UserWithoutPosition;

  constructor(public activeModal: NgbActiveModal) {
    this.user = new UserWithoutPosition('', '', '');
  }

  save(): void {
    if(this.isNotEmpty(this.user.username) && this.isNotEmpty(this.user.password)) {
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
