// export class User {
//   constructor(id: string, username: string, latest_positions: []) {
//     this.id = id;
//     this.username = username;
//     this.latest_positions = latest_positions;
//   }
//   id: string = "";
//   username: string = "";
//   latest_positions: [] = [];
//
// }

export interface User {
  id: string,
  username: string,
  latestPositions: Position[];
}

export interface Position {
  _id: string,
  id: string,
  lat: number,
  lng: number;
}
