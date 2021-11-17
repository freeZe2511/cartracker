export class User {
  constructor(id: string, username: string, latest_positions: []) {
    this.id = id;
    this.username = username;
    this.latest_positions = latest_positions;
  }
  id: string;
  username: string;
  latest_positions: [];
}
