// データストアに対する命令はレポジトリに置く
interface IUserRepository {
  save: (user: RepositoryUser) => void;
  find: (
    userId: RepositoryUserId,
    userName: RepositoryUserName
  ) => RepositoryUser;
}

// Userオブジェクトの永続化をリポジトリのIUserRepositoryオブジェクトに依頼
class UserRepository implements IUserRepository {
  // データストアへの接続文字列
  private connectString: string;
  constructor(connectString: string) {
    this.connectString = connectString;
  }
  // ユーザーをデータストアに登録メソッド
  public save(user: RepositoryUser) {
    // データストアで作成したユーザーを登録するコードが入る
  }
  // 指定した名前のユーザーがデータストアにいるか確認するメソッド
  public find(userId: RepositoryUserId, userName: RepositoryUserName) {
    // データストアを検索し一致したユーザーを返す
    return new RepositoryUser(userId, userName);
  }
}

// Userオブジェクトの永続化をリポジトリのIUserRepositoryオブジェクトに依頼
class RepositoryUserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  // ユーザーの重複を確認するメソッド
  public exists(user: RepositoryUser) {
    // リポジトリでデータストアに重複したユーザーがいないか確認
    const found = this.userRepository.find(user.userId(), user.userName());
    return found !== null;
  }
}

class RepositoryUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}
class RepositoryUserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class RepositoryUser {
  private id: RepositoryUserId;
  private name: RepositoryUserName;
  constructor(id: RepositoryUserId, name: RepositoryUserName) {
    if (!id) throw new Error("ArgumentNullException id");
    if (!name) throw new Error("ArgumentNullException name");
    this.id = id;
    this.name = name;
  }
  public userId() {
    return this.id;
  }
  public userName() {
    return this.name;
  }
}

class RepositoryProgram {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public createUser(userName: string) {
    const userId = "dddd";
    const user = new RepositoryUser(
      new RepositoryUserId(userId),
      new RepositoryUserName(userName)
    );
    const userService = new RepositoryUserService(this.userRepository);
    // セットしたリポジトリを経由してユーザーの重複を確認
    if (userService.exists(user)) {
      throw new Error(`${userName}は既に存在しています`);
    }
    // 重複確認にも使ったリポジトリを使ってデータストアに保存
    this.userRepository.save(user);
  }
}
