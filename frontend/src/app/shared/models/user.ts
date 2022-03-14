/**
 * User model
 */
export interface User {
  id: string,
  password?: string,
  username: string,
  zoneid?: string,
  latestPositions?: Position[];
}

/**
 * (User) Position model
 */
export interface Position {
  _id: string,
  id: string, //userid
  lat: number,
  lng: number,
  inZone: boolean;
  speed: number;
  isMoving: boolean;

}
