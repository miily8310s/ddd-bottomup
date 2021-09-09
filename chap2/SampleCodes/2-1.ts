// プリミティブな値で氏名を表示
const fullName = "yamada taro";
console.log(fullName);

// プリミティブな値から姓だけを表示
const showLastName = (fullName: string) => {
  const tokens = fullName.split(" ");
  const lastName = tokens[0];
  console.log(lastName);
};

// 姓を正しく表示できるパターン
// return yamada
showLastName("yamada taro");
// 姓が表示できてないパターン
// return john
showLastName("john doe");

// 氏名を表現するFullNameクラス
// 本クラスで確実に性を表示できる
class FullName {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  public getFirstName() {
    return this.firstName;
  }
  public getLastName() {
    return this.lastName;
  }
}
const jpFullName = new FullName("taro", "yamada");
// return yamada
console.log(jpFullName.lastName);
// return doe
const usFullName = new FullName("john", "doe");
console.log(usFullName.lastName);
