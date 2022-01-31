import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  public convertTime(id: any) {
    let timeStamp = parseInt(id.substr(0, 8), 16) * 1000
    return new Date(timeStamp)  // TODO refactor into nice format
  }
}
