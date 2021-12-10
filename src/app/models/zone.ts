import {Position} from "./user";

export interface Zone {
  _id: string,
  id: string,
  center: Pos,
  radius: number
}

export interface Zone {
  _id: string,
  id: string,
  lat: number,
  lng: number,
  radius: number
}

export interface Zone {
  _id: string,
  id: string,
  pos: Pos[],
  radius: number
}

export interface Pos {
  lat: number,
  lng: number
}
