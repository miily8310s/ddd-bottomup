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
