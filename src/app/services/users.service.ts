import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[];
  public zones: string[];

  constructor(private httpService: HttpService) {
    this.zones = [
      "All",
      "Gießen",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p"
    ]
    this.users = [];
  }

  public getUsersList(): any {
    return this.httpService.getUserList();
  }

  public createUser(user: User) {
    this.httpService.post("http://localhost:9090/api/v1/user", {
      username: user.username,
      password: user.password
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public updateUser(user: User) {
    this.httpService.put("http://localhost:9090/api/v1/user/" + user.id, {
      username: user.username,
      password: user.password
    }).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public deleteUser(userid: string) {
    this.httpService.delete("http://localhost:9090/api/v1/user/" + userid).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

}
