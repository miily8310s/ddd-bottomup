// リレーショナルデータベースに接続する際のファクトリ
export interface IUserFactory {
  create: (name: FactoryUserName) => FactoryUser;
}
