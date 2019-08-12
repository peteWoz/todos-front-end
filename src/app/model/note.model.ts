
export class Note {
  public id: bigint;
  public username: string;
  public description: string;
  public targetDate: string;
  public done: boolean;
  public time: string;


  constructor(description: string, done: boolean, id: bigint, targetDate: string, username: string, time: string) {
    this.id = id;
    this.username = username;
    this.description = description;
    this.targetDate = targetDate;
    this.done = done;
    this.time = time;
  }
}
