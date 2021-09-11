class Name {
  private readonly value: string;
  constructor(value: string) {
    if (!value) {
      throw new Error("InvalidArgumentException");
    }
    if (value.match(/@^[a-zA-Z]+$/g)) {
      throw new Error(`許可されていない文字が使われています ${value}`);
    }
    this.value = value;
  }
}
