import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AuthService} from '../auth/auth.service';
import {HttpService} from "../http/http.service";
import {User} from "../../models/user";
import {AlertService} from "../alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users!: any[]

  constructor(private httpService: HttpService, private authService: AuthService, private alertService: AlertService) {
  }

  /**
   * Call httpService to get User data
   */
  public getUsersList(): any {
    return this.httpService.get(environment.backendURL + "api/v1/users", {headers: this.authService.authHeader});
  }

  /**
   * Call httpService post to create user with provided data
   * @param user
   */
  public createUser(user: User) {
    this.httpService.post(environment.backendURL + "api/v1/user", {
      username: user.username,
      password: user.password,
      zoneid: user.zoneid
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('User added');
      },
      error: (e) => {
        // console.error(e);
        this.alertService.onError(e["error"]);
      },
      complete: () => console.info('complete')
    });
  }

  /**
   * Call httpService put to update user with provided data
   * @param user
   */
  public updateUser(user: User) {
    this.httpService.put(environment.backendURL + "api/v1/user/" + user.id, {
      username: user.username,
      password: user.password, // TODO zone
      zoneid: user.zoneid
    }, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('User changed');
      },
      error: (e) => {
        // console.error(e);
        this.alertService.onError('Failed editing User');
      },
      complete: () => console.info('complete')
    });
  }

  /**
   * Call httpService delete to delete user with userid
   * @param userid
   */
  public deleteUser(userid: string) {
    this.httpService.delete(environment.backendURL + "api/v1/user/" + userid, {headers: this.authService.authHeader}).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.alertService.onSuccess('User was deleted');
      },
      error: (e) => {
        console.error(e);
        this.alertService.onError('Failed to delete User')
      },
      complete: () => console.info('complete')
    });
  }
}
