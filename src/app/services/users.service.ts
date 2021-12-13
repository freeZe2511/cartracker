import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";
import {interval, Subscription, switchMap} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[];
  private timeInterval!: Subscription;

  constructor(private httpService: HttpService) {
    this.users = [];
  }

  public initZoneArray(){
    // TODO
  }

  public getUsersList(): any {
    return this.httpService.getUserList();
  }

  public initUserArray() {
   this.getUsersList().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (e: any) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  public updateUserArrayEverySecond() {
    this.timeInterval = interval(1000).pipe(
      switchMap(() => this.getUsersList()),
    ).subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
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
