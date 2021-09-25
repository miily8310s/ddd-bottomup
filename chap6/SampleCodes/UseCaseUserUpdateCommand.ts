class UseCaseUserUpdateCommand {
  private id: string;
  private name: string | null;
  private mailAddress: string | null;
  constructor(id: string, name: string = null, mailAddress: string = null) {
    this.id = id;
    this.name = name;
    this.mailAddress = mailAddress;
  }
  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getMailAddress() {
    return this.mailAddress;
  }
}
