import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, Position} from "../models/user";

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  // generalisieren
  getCurrentUserPos(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9090/api/v1/map/1");
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9090/api/v1/users");
  }

  // <T> ?
  get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  post(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  put(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.put(url, body, options);
  }

  delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }


}
