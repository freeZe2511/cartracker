export interface User {
  id: string,
  password?: string,
  username: string,
  zone?: string,
  latestPositions?: Position[];
}

export interface Position {
  _id: string,
  id: string, //userid
  lat: number,
  lng: number;
}

export class UserWithoutPosition implements User{
  public id: string;
  public username: string;
  public password?: string;

  constructor(id: string, username: string, password?: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

export class PositionClass implements Position{
  public _id: string;
  public id: string;
  public lat: number;
  public lng: number;

  constructor(_id: string, id: string, lat: number, lng: number) {
    this._id = _id;
    this.id = id;
    this.lat = lat;
    this.lng = lng;
  }
}
