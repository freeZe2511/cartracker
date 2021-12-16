export interface User {
  id: string,
  password?: string,
  username: string,
  zoneid?: string,
  latestPositions?: Position[];
}

export interface Position {
  _id: string,
  id: string, //userid
  lat: number,
  lng: number,
  inZone: boolean;
}

export class UserWithoutPosition implements User{
  public id: string;
  public username: string;
  public password?: string;
  zoneid?: string;

  constructor(id: string, username: string, password?: string, zone?: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.zoneid = zone;
  }
}

export class PositionClass implements Position{
  public _id: string;
  public id: string;
  public lat: number;
  public lng: number;
  public inZone: boolean;

  constructor(_id: string, id: string, lat: number, lng: number, inZone: boolean) {
    this._id = _id;
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.inZone = inZone;
  }
}
