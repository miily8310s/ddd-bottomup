export class CircleCreateCommand {
  private userId: string;
  private name: string;
  constructor(userId: string, name: string) {
    // サークルのオーナーのID
    this.userId = userId;
    // 作成するサークルの名前
    this.name = name;
  }
  public getUserId() {
    return this.userId;
  }
  public getCircleName() {
    return this.name;
  }
}
