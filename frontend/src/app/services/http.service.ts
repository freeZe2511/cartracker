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

  // // generalisieren
  // public getCurrentUserPos(): Observable<User[]> {
  //   return this.http.get<User[]>("http://localhost:9090/api/v1/map/1");
  // }
  //
  // public getUserList(): Observable<User[]> {
  //   return this.http.get<User[]>("http://localhost:9090/api/v1/users");
  // }

  // <T> ?
  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public post(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  public put(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.put(url, body, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }


}
