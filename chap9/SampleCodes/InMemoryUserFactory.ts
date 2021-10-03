// データベースに接続しないテスト用のファクトリ
class InMemoryUserFactory {
  private currentId: number;
  constructor() {}
  public create(name: FactoryUserName) {
    this.currentId++;
    return new FactoryUser(new FactoryUserId(this.currentId.toString()), name);
  }
}
