import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {User} from "../models/user";
import {firstValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private httpService: HttpService) {
  }

  _users: User[] = [];

  getUserPositions(): User[] {
    this.httpService.getCurrentUserPos().subscribe(res => this.handleData(res["data"]));
    // return firstValueFrom(this.httpService.getCurrentUserPos());
    return this._users;
  }

  handleData(data: any): void {
    for (const user of data) {
      this._users.push(new User(user["id"], user["username"], user["latest-positions"][0]))
    }
  }

  get users(): User[]{
    return this._users;
  }




}
