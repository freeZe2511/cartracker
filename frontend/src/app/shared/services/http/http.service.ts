import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

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
