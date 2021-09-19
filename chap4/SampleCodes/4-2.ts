class DomainServiceUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}
class DomainServiceUserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class DomainServiceUser {
  private readonly id: DomainServiceUserId;
  private name: DomainServiceUserName;
  constructor(id: DomainServiceUserId, name: DomainServiceUserName) {
    if (!id) throw new Error("ArgumentNullException id");
    if (!name) throw new Error("ArgumentNullException name");
    this.id = id;
    this.name = name;
  }
  // ユーザーの重複を確認するメソッド
  public equals(user: DomainServiceUser) {
    // 重複を確認するコードが入る
  }
}

const domainServiceUserId = new DomainServiceUserId("899080");
const domainServiceUserName = new DomainServiceUserName("yamada");
const domainServiceUser = new DomainServiceUser(
  domainServiceUserId,
  domainServiceUserName
);
// 自分自身に重複の問い合わせをしており、不自然
console.log(domainServiceUser.equals(domainServiceUser));

// 重複確認用のユーザーオブジェクトのインスタンスを生成
const checkDomainServiceUserId = new DomainServiceUserId("899080");
const checkDomainServiceUserName = new DomainServiceUserName("yamada");
const checkDomainServiceUser = new DomainServiceUser(
  checkDomainServiceUserId,
  checkDomainServiceUserName
);

// ユーザーではない重複確認用のオブジェクトと比較しており、不自然
console.log(checkDomainServiceUser.equals(domainServiceUser));
