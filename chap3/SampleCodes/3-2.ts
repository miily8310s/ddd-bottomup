class UnChangedEntityUser {
  private value: string | undefined;

  constructor(value: string) {
    this.changeUserName(value);
  }
  // エンティティではメソッドを使って属性を変更する
  public changeUserName(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    if (value.length < 3) throw new Error(`ユーザ名は3文字以上です ${value}`);

    this.value = value;
  }
}

console.log(new UnChangedEntityUser("fuga hoge"));

class IdentifiedUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class IdentifiedUser {
  private id: IdentifiedUserId;
  private name: string;
  constructor(id: IdentifiedUserId, name: string) {
    if (!id) throw new Error("ArgumentNullException id");
    if (!name) throw new Error("ArgumentNullException name");
    this.id = id;
    this.name = name;
  }
}

const identifiedUserId = new IdentifiedUserId("432432");
console.log(new IdentifiedUser(identifiedUserId, "fuga hoge"));

class HaveIdentifiedUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class HaveIdentifiedUser {
  private readonly id: HaveIdentifiedUserId; // ユーザーの識別子
  private name: string | undefined;
  constructor(id: HaveIdentifiedUserId, name: string) {
    if (!id) throw new Error("ArgumentNullException id");
    if (!name) throw new Error("ArgumentNullException name");
    this.id = id;
    this.changeUserName(name);
  }
  public changeUserName(name: string) {
    if (!name) throw new Error("ArgumentNullException");
    if (name.length < 3) throw new Error(`ユーザ名は3文字以上です ${name}`);

    this.name = name;
  }
  public equals(other: HaveIdentifiedUser) {
    if (other === null) return false;
    if (this === other) return true;
    return this.id === other.id;
  }
}

const isEqualUser = (user1: HaveIdentifiedUser, user2: HaveIdentifiedUser) => {
  if (user1.equals(user2)) {
    console.log("同一のユーザーです");
    return;
  }
  console.log("別々のユーザーです");
};

const haveIdentifiedUserId = new HaveIdentifiedUserId("899080");
const haveIdentifiedUserId1 = new HaveIdentifiedUserId("000000");
const haveIdentifiedUser1 = new HaveIdentifiedUser(
  haveIdentifiedUserId,
  "yamada"
);
const haveIdentifiedUser2 = new HaveIdentifiedUser(
  haveIdentifiedUserId,
  "john"
);
const haveIdentifiedUser3 = new HaveIdentifiedUser(
  haveIdentifiedUserId1,
  "notValid"
);
// 同一IDなのでtrue
isEqualUser(haveIdentifiedUser1, haveIdentifiedUser2);
// 別々のIDなのでfalse
isEqualUser(haveIdentifiedUser3, haveIdentifiedUser2);
