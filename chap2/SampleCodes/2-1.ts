import { FullName } from "./FullName.ts";

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

const jpFullName = new FullName("taro", "yamada");
// return yamada
console.log(jpFullName.lastName);
// return doe
const usFullName = new FullName("john", "doe");
console.log(usFullName.lastName);
