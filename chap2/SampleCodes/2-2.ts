import { FullName } from "./FullName.ts";

// 2.2.1「値の変更」をしている
let greet = "こんにちは";
console.log(greet);
greet = "Hello";
console.log(greet);

// 「値の変更」をしている疑似コード
// ※changeToは本来存在しないメソッド
const changeToGreet = "こんにちは";
// greet.changeTo("Hello");
console.log(changeToGreet);

// L9のコードが許されるならこちらも許されるはず
// "こんにちは".changeTo("Hello");
console.log(changeToGreet);

// 一般的に見られる値の変更
// ただしFullNameはシステム固有の値を表す値オブジェクトなので不変であるべき
// なのでchangeLastNameはFullNameクラスに定義すべきではない
const fullName = new FullName("taro", "yamada");
fullName.changeLastName("sato");

// 2.2.2交換が可能である
// 数字の変更
let num = 0;
num = 1;
// 文字の変更
let c = "0";
c = "b";
// 文字列の変更
let chGeet = "こんにちは";
chGeet = "hello";
// 値オブジェクトの変更
let chFullName = new FullName("taro", "yamada");
chFullName = new FullName("taro", "tanaka");

// 2.2.3 等価性によって比較される
