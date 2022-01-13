import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {User} from "../../models/user";
import {interval, Subscription, switchMap} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {AlertsService} from "../alerts/alerts.service";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[];
  private timeInterval!: Subscription;

  constructor(private httpService: HttpService, private authService: AuthService, public _alert: AlertsService) {
    this.users = [];
  }

  public getUsersList(): any {
    return this.httpService.get("http://localhost:9090/api/v1/users", {headers: this.authService.authHeader});
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
      password: user.password,
      zoneid: user.zoneid
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
      password: user.password, // TODO zone
      zoneid: user.zoneid
    }).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.onSuccess('User changed');
      },
      error: (e) => {
        console.error(e);
        this._alert.onError('Failed editing User');
      },
      complete: () => console.info('complete')
    });
  }

  public deleteUser(userid: string) {
    this.httpService.delete("http://localhost:9090/api/v1/user/" + userid).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alert.onSuccess('User was deleted');
      },
      error: (e) => {
        console.error(e);
        this._alert.onError('Failed to delete User')
      },
      complete: () => console.info('complete')
    });
  }

}
