import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../models/user";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  _users: User[] = [
    new User("943745854762562", "testuser01", []),
    new User("545262457457626", "testuser02", []),
    new User("924645898223412", "testuser03", []),
    new User("242666234234326", "testuser04", []),
    new User("478685685675433", "testuser05", []),
    new User("835236345233223", "testuser06", []),
    new User("663474532235346", "testuser07", []),
    new User("334235346435754", "testuser08", []),
    new User("568569789082296", "testuser09", []),
    new User("659659652867567", "testuser10", []),
    new User("428574564575688", "testuser11", []),
  ]

  displayedColumns: string[] = ['id', 'username', 'password', 'zone', 'created', 'actions'];
  dataSource = new MatTableDataSource(this._users);


}
