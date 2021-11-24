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

  public getUsersList(): any {
    return this.httpService.getUserList();
  }

  public createUser(user: User) {
    this.httpService.post("http://localhost:9090/api/v1/user", {
      username: user.username,
      password: user.password
    });
  }

  public updateUser(user: User) {
    this.httpService.put("http://localhost:9090/api/v1/user/" + user.id, {
      username: user.username,
      password: user.password
    });
  }

}
