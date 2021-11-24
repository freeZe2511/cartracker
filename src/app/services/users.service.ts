import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  constructor(private httpService: HttpService) {
  }

  getUsersList(): any {
    return this.httpService.getUserList();
  }

}
