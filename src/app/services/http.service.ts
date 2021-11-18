import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getCurrentUserPos(): Observable<any> {
   return this.http.get("http://localhost:9090/api/v1/admin/map/coords/1");
  }



}
