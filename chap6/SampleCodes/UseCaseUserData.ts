class UseCaseUserData {
  private id: string;
  private name: string;
  // ここの引数をUserオブジェクトにしておくことで
  // Userオブジェクトのパラメータが増えても柔軟に対応できる
  constructor(user: UseCaseUser) {
    this.id = user.userId.toString();
    this.name = user.userName.toString();
  }
  public userDataId() {
    return this.id;
  }
  public userDataName() {
    return this.name;
  }
}
