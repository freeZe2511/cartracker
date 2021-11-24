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

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private modalService: NgbModal) {
  }

  users: User[] = [];
  timeInterval!: Subscription;

  ngOnInit(): void {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.userService.getUsersList()),
    ).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.users = res;
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

  public async edit(user: User) {
    const modalReference = this.modalService.open(EditUserModalComponent);
    modalReference.componentInstance.user = user;

    try {
      const resultUser: User = await modalReference.result;
      this.userService.createUser(resultUser);
    } catch(error) {
      console.log(error);
    }
  }

  public async add() {
    const modalReference = this.modalService.open(AddUserModalComponent);

    try {
      const resultUser: User = await modalReference.result;
      this.userService.updateUser(resultUser);
    } catch(error) {
      console.log(error);
    }
  }

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource(this.userService.users);

  // https://www.freakyjolly.com/angular-material-table-operations-using-dialog/
  // createUser()
  // addUser(u: User){
  //   this.dataSource.data.push(u);
  //   this.dataSource._updateChangeSubscription();
  // }


}
