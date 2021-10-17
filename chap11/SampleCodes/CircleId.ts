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
