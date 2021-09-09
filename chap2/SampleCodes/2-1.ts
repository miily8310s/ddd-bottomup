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
