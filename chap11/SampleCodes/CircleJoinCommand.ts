export class CircleJoinCommand {
  private userId: string;
  private circleId: string;
  constructor(userId: string, circleId: string) {
    // サークルに参加するユーザのID
    this.userId = userId;
    // 参加するサークルのID
    this.circleId = circleId;
  }
  public getUserId() {
    return this.userId;
  }
  public getCircleId() {
    return this.circleId;
  }
}
