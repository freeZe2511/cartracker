/**
 * Zone model
 */
export interface Zone {
  _id?: string,
  id?: string,
  name: string,
  pos: Pos[],
  radius: number
}

/**
 * (Zone) Position model
 */
export interface Pos {
  lat: number,
  lng: number
}
