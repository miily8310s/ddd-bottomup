class UserName {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    if (value.length < 3) throw new Error(`ユーザ名は3文字以上です ${value}`);

    this.value = value;
  }
}

export class UserId {
  private value: string;

  constructor(value: string) {
    if (!value) throw new Error("ArgumentNullException");
    this.value = value;
  }
}

export class User {
  private id: UserId;
  private name: UserName;
  private isPremium: boolean;
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
  public getIsPremium() {
    return this.isPremium;
  }
}

export class CircleId {
  private value: string;
  constructor(value: string) {
    if (!value) {
      throw Error("ArgumentNullException value");
    }
    this.value = value;
  }
  public getValue() {
    return this.value;
  }
}

export class CircleName {
  private value: string;
  constructor(value: string) {
    if (!value) {
      throw Error("ArgumentNullException value");
    }
    if (value.length < 3) {
      throw Error("サークル名は３文字以上です");
    }
    if (value.length > 20) {
      throw Error("サークル名は２０文字以下です");
    }
    this.value = value;
  }
  public getValue() {
    return this.value;
  }
  public isEqual(other: CircleName) {
    return this.value === other.value;
  }
}

export class Circle {
  private members: UserId[];
  private id: CircleId;
  private name: CircleName;
  private created: number;
  constructor(members: UserId[]) {
    if (!members) {
      throw Error("ArgumentNullException members");
    }
    this.members = members;
    this.id = new CircleId("");
    this.name = new CircleName("");
    this.created = Date.now();
  }
  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getMembers() {
    return this.members;
  }
  public getCreated() {
    return this.created;
  }
}
