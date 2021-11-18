import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpService: HttpService) {
  }

  getUserPositions(): any {
    // this.httpService.getCurrentUserPos().subscribe(res => {
    //   console.log(res)
    //   // for (const user of res) {
    //   //   this._users.push(new User(user["id"], user["username"], user["latest-positions"][0]))
    //   // }
    //   this._users = res;
    //   console.log(this._users)
    // });
    return firstValueFrom(this.httpService.getCurrentUserPos());
  }

  getUserPositions2(): any {
    return this.httpService.getCurrentUserPos();
  }

  // handleData(data: any): void {
  //   for (const user of data) {
  //     this._users.push(new User(user["id"], user["username"], user["latest-positions"][0]))
  //   }
  //   console.log(this._users)
  // }

  // getX(): Promise<User[]> {
  //   return  firstValueFrom(this.httpService.getCurrentUserPos());
  // }

  // getOne(): Observable<User> {
  //   return this.http.get<User>("http://localhost:9090/api/v1/admin/map/user/378bf7c9-367d-4928-b089-6269840ad540&5");
  // }



  // get users(): User[] {
  //   return this._users;
  // }




}
