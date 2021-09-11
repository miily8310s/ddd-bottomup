class Money {
  private amount: number;
  private currency: string;
  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
  public add(arg: Money) {
    if (!arg) {
      throw new Error("ArgumentNullException");
    }
    if (this.currency !== arg.currency) {
      throw new Error(
        `通貨単位が異なります this: ${this.currency} arg: ${arg.currency}`
      );
    }
  }
}

const jpy = new Money(1000, "JPY");
const usd = new Money(10, "USD");
const result = jpy.add(usd); // 例外が送出される
