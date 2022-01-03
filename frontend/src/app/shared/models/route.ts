import {Position} from "./user";

export class Route {
  public userid: string;
  public timeInHours: number;
  public timeInMinutes: number;
  public positions?: Position[];

  constructor(userid: string, timeInHours: number, timeInMinutes: number, positions?: Position[]) {
    this.userid = userid;
    this.timeInHours = timeInHours;
    this.timeInMinutes = timeInMinutes;
    this.positions = positions;
  }
}
