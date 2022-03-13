import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  mode: 'User' | 'Zone' | 'Confirm',
  action: 'Create' | 'Update' | 'Delete' | 'None' | 'Confirm',
  extras: any[],
  result: any[];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }
}


