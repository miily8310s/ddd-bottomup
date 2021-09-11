class ModelNumber {
  private productCode: string;
  private branch: string;
  private lot: string;

  constructor(productCode: string, branch: string, lot: string) {
    if (!productCode) throw new Error("ArgumentNullException productCode");
    if (!branch) throw new Error("ArgumentNullException branch");
    if (!lot) throw new Error("ArgumentNullException lot;");
    this.productCode = productCode;
    this.branch = branch;
    this.lot = lot;
  }
  public changeToString(): string {
    return this.productCode + "-" + this.branch + "-" + this.lot;
  }
}

const model = new ModelNumber("a20000", "100", "1");
console.log(model.changeToString());

class UserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    if (value.length < 3) throw new Error(`ユーザ名は3文字以上です ${value}`);

    this.value = value;
  }
}

const userName = new UserName("hoge hoge");
// 不正なユーザー名
// const userName = new UserName("");
// const userName = new UserName("aa");
console.log(userName);

class UserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class User {
  private id: UserId;
  private name: UserName;
  constructor(id: UserId, name: UserName) {
    this.id = id;
    this.name = name;
  }
  public setId(id: UserId) {
    this.id = id;
  }
  public getId() {
    return this.id;
  }
  public setName(name: UserName) {
    this.name = name;
  }
  public getName() {
    return this.name;
  }
}

const createUser = (userName: UserName): User => {
  const id = new UserId("fuga");
  const name = new UserName("hoge");
  const user = new User(id, name);
  // ここで型定義違いによるコンパイルエラーが発生する
  // user.setId(userName);
  return user;
};

const updateUser = (userId: string, userName: string): User => {
  const id = new UserId(userId);

  // UserNameクラスにルールがすでに定義されているので、メソッドの方に何度も書く必要がない
  // if (!userName) throw new Error("ArgumentNullException");
  // if (userName.length < 3) throw new Error(`ユーザ名は3文字以上です ${userName}`);

  const name = new UserName(userName);
  const user = new User(id, name);
  // ここで型定義違いによるコンパイルエラーが発生する
  // user.setId(userName);
  return user;
};
