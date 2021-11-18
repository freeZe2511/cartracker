import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User, Position} from "../models/user";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  // generalisieren
  getCurrentUserPos(): Observable<User[]> {
   return this.http.get<User[]>("http://localhost:9090/api/v1/admin/map/coords/1");
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9090/api/v1/admin/user/users");
  }



}
