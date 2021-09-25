class UseCaseUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}
class UseCaseUserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class UseCaseUser {
  private id: UseCaseUserId;
  private name: UseCaseUserName;
  constructor(name: UseCaseUserName) {
    if (!name) throw new Error("ArgumentNullException name");
    this.id = new UseCaseUserId("ddd");
    this.name = name;
  }
  public userId() {
    return this.id;
  }
  public userName() {
    return this.name;
  }
  public changeName(name: UseCaseUserName) {
    if (!name) throw new Error("ArgumentNullException name");
    this.name = name;
  }
}
