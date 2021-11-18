import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../models/user";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {interval, Subscription, switchMap} from "rxjs";
import {UserService} from "../services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  users: User[] = [];
  timeInterval!: Subscription;

  ngOnInit(): void {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.userService.getUsersList()),
    ).subscribe({
      next: (res: any) => this.dataSource.data = res,
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

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'status', 'created', 'actions'];
  dataSource = new MatTableDataSource(this.users);


}
