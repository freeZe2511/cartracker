import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  /**
   * Abstract http get method
   * @param url
   * @param options
   */
  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  /**
   * Abstract http post method
   * @param url
   * @param options
   * @param body
   */
  public post(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  }

  /**
   * Abstract http put method
   * @param url
   * @param options
   * @param body
   */
  public put(url: string, body: any | null, options?: any): Observable<any> {
    return this.http.put(url, body, options);
  }

  /**
   * Abstract http delete method
   * @param url
   * @param options
   */
  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }
}
