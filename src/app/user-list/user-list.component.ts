import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../models/user";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {interval, Observable, Subscription, switchMap} from "rxjs";
import {UserService} from "../services/users.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditUserModalComponent} from "../edit-user-modal/edit-user-modal.component";
import {AddUserModalComponent} from "../add-user-modal/add-user-modal.component";
import {MapComponent} from "../map/map.component";
import {MapService} from "../services/map.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private _user: UserService, private modalService: NgbModal, private mapService: MapService) {
  }

  timeInterval!: Subscription;

  ngOnInit(): void {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this._user.getUsersList()),
    ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this._user.users.set("all", res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public centerOnUser(userid: string) {
    this.mapService.centerOnMarker(userid);
  }

  public async add() {
    const modalReference = this.modalService.open(AddUserModalComponent);

    try {
      const resultUser: User = await modalReference.result;
      this._user.createUser(resultUser);
    } catch(error) {
      console.log(error);
    }
  }

  public async edit(user: User) {
    const modalReference = this.modalService.open(EditUserModalComponent);
    modalReference.componentInstance.user = user;

    try {
      const resultUser: User = await modalReference.result;
      this._user.updateUser(resultUser);
    } catch(error) {
      console.log(error);
    }
  }

  public async delete(userid: string) {
    this._user.deleteUser(userid);
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource(this._user.users.get("all"));

  // https://www.freakyjolly.com/angular-material-table-operations-using-dialog/
  // createUser()
  // addUser(u: User){
  //   this.dataSource.data.push(u);
  //   this.dataSource._updateChangeSubscription();
  // }


}
