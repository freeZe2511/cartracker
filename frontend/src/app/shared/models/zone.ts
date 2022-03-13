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
