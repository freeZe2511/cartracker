import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../../../components/confirm-modal/confirm-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(public modalService: NgbModal) { }

  confirmDialog() {
    const modalReference = this.modalService.open(ConfirmModalComponent);
    return modalReference.result;
  }
}
