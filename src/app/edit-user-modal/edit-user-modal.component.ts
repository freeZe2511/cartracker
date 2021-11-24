import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../models/user";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
  public user!: User;

  constructor(public activeModal: NgbActiveModal) { }

  save(): void {
    if(this.isNotEmpty(this.user.id) && this.isNotEmpty(this.user.username) && this.isNotEmpty(this.user.password)) {
      console.log(this.user)
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
