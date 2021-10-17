import { CircleId } from "./CircleId";
import { CircleName } from "./CircleName";

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

export interface IUserRepository {
  save: (user: User) => void;
  find: (userId: UserId) => User;
}

export class Circle {
  private id: CircleId;
  private name: CircleName;
  private owner: User;
  private members: User[];
  constructor(id: CircleId, name: CircleName, owner: User, members: User[]) {
    if (!id) {
      throw Error("ArgumentNullException id");
    }
    if (!name) {
      throw Error("ArgumentNullException name");
    }
    if (!owner) {
      throw Error("ArgumentNullException owner");
    }
    if (!members) {
      throw Error("ArgumentNullException members");
    }
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }
  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getOwner() {
    return this.owner;
  }
  public getMembers() {
    return this.members;
  }
}
