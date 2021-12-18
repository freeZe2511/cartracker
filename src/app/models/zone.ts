
export interface Zone {
  _id?: string,
  id?: string,
  name: string,
  pos: Pos[],
  radius: number
}

export interface Pos {
  lat: number,
  lng: number
}

export class ZoneClass implements Zone {
  public _id?: string;
  public id?: string;
  public name: string;
  public pos: Pos[];
  public radius: number;

  constructor(name: string, pos: Pos[], radius: number, _id?: string, id?: string) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.pos = pos;
    this.radius = radius;
  }
}

export class PosClass implements Pos {
  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
