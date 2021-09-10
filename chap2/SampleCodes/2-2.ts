// 「値の変更」をしている
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
