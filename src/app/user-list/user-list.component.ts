import { Component, OnInit } from '@angular/core';
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
    new User("123542351235", "test1", []),
    new User("234235335235", "test2", []),
    new User("312364357514", "test3", []),
    new User("413124125125", "test4", []),
    new User("534645788546", "test5", []),
  ]

}
