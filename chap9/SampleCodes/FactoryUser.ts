class FactoryUserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}
class FactoryUserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

class FactoryUser {
  private id: FactoryUserId;
  private name: FactoryUserName;
  constructor(id: FactoryUserId, name: FactoryUserName) {
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
