import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  _users: User[] = [
    new User("143745854762562", "test1", []),
    new User("245262457457626", "test2", []),
    new User("324645898223412", "test3", []),
    new User("442666234234326", "test4", []),
    new User("578685685675433", "test5", []),
  ]

  displayedColumns: string[] = ['id', 'username', 'symbol'];
  dataSource = this._users;


}
