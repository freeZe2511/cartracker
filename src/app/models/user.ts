export interface User {
  id: string,
  password?: string,
  username: string,
  latestPositions?: Position[];
}

export interface Position {
  _id: string,
  id: string,
  lat: number,
  lng: number;
}

export class UserWithoutPosition implements User{
  public id: string;
  public username: string;
  public password?: string;

  constructor(id: string, username: string, password?: string, latestPositions?: Position[]) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
