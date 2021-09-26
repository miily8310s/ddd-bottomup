# ７章 柔軟性をもたらす依存関係のコントロール

- ソフトウェアに柔軟性をもたらすためには、依存関係を制御する必要がある
- プログラムには「依存」という概念がある
- 依存はオブジェクトがオブジェクトを参照するだけで発生する
  - なので、オブジェクト同士に依存関係が発生するのは自然なこと
- ソフトウェアを柔軟に保つために必要なこと（本章で解説する依存のコントロール）は
  - 特定の技術的要素への依存を避ける
  - 変更の主導権を主たる抽象に移す
- オブジェクト同士の依存がどういったものか確認し、ソフトウェアを柔軟に保つために技術的要素への依存から脱却する

## 7-1 技術要素への依存がもたらすもの

- ソフトウェアの中核に位置するオブジェクトを変更することを想像してみる
  - そのオブジェクトは多くのオブジェクトに依存し、逆に多く依存されている
  - たったひとつの変更が多くのオブジェクトに影響する
- プログラムを組み上げていく過程でオブジェクト同士の依存関係は避けられない
- 重要なことは依存を避けることではなく、コントロールすること
- 本章で解説する依存のコントロールはドメインのロジックを技術的要素から解き放ち、ソフトウェアに柔軟性を与えるもの
  - コードが技術的要素に支配されることの問題を確認し、その解決法を確認していく

## 7-2 依存とは

- 依存はあるオブジェクトからあるオブジェクトを参照するだけで発生する
- 次のコード例では ObjectA は ObjectB に参照（=依存）している
  - ObjectB の定義が存在しない限り ObjectA は成り立たない状態

```ts
class ObjectA {
  private objectB: ObjectB;
}
```

- 依存関係はこうした参照だけでなく、インターフェイスとその実体になる実装クラスの関係にも依存が生まれる
- 次のコード例では UserRepository クラスは IUserRepository インターフェイスに依存している
  - UserRepository クラスで IUserRepository の定義が存在しなかったら、コンパイルエラーが出る

```ts
interface IUserRepository {
  find(id: UserId): User;
}

class UserRepository implements IUserRepository {
  find(id: UserId): User {
    // 略
  }
}
```

- 次に UserApplicationService クラスに UserRepository クラスを参照してみる
- UserApplicationService クラスには UserRepository クラスを参照していることで問題が発生している
  - UserApplicationService クラスが特定のデータストアに依存している状態
  - ソフトウェアが健全に成長するためには開発やテストで気軽にコードを実行するように仕向けることが重要
  - 特定のデータストアに結びつけるとこれが不可能になってしまう（データベースの準備・データを投入するなどが必要になる）

```ts
class UserApplicationService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}
```

- こうした問題を解決するには第５章で登場したリポジトリが役立つ
- UserRepository クラスではなく、IUserRepository インターフェイスを参照してみる
- 抽象型（インターフェイス）を参照するようにしたことで IUserRepository を実装した具象クラスであれば、その実体が何であっても引き渡せるようになった
  - 特定のデータストアに結びつかなくなった
  - テスト用のリポジトリを利用してユニットテストを実施できる
  - 別のデータストアを利用するリポジトリを用意することもできるようになった

```ts
class UserApplicationService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
}
```

- 抽象型を利用することで、具象型に向いていた依存の矢印が抽象型へ向くようになる
- このようにすべてのモジュールが抽象へ依存するように制御することはビジネスロジックを具体的な実装から解き放ち、より純粋なものに昇華する効果がある
- この抽象型を用いた依存関係の制御は「依存関係逆転の原則」として知られる

## 7-3 依存関係逆転の原則とは

- 依存関係逆転の原則は次のように定義される
  - 上位レベルのモジュールは下位レベルのモジュールに依存してはならない、どちらのモジュールも抽象に依存すべきである
  - 抽象は、実装の詳細に依存してはならない。実装の詳細が抽象に依存すべきである
- 依存関係逆転の原則はソフトウェアを柔軟なものに変化させ、ビジネスロジックを技術的な要素から守るのに欠かせないもの

### 抽象に依存せよ

- プログラムにはレベルと呼ばれる概念がある
  - 低レベル：機会に近い具体的な処理
  - 高レベル：人間に近い抽象的な処理
- 例えばデータストアを操作する UserRepository は下位レベルになり、UserApplicationService は上位レベルになる
- そのため、UserApplicationService が UserRepository を参照していると、「上位レベルのモジュールは下位レベルのモジュールに依存してはならない」原則に反してしまう
- ここで抽象型として IUserRepository を導入する
  - UserApplicationService / UserRepository は共に抽象型の IUserRepository を参照するようになる
  - 上位レベルのモジュールは下位レベルのモジュールに依存しなくなる
  - さらに「どちらのモジュールも抽象に依存すべきである」原則も満たす

### 主導権を抽象に

- 高レベルなモジュール=抽象が主体となるべき。低レベルなモジュールは主体になるべきではない
- インターフェイスを宣言し、低レベルのモジュールはそのインターフェイスに合わせて実装を行うことで、より重要な高次元の概念に主導権を握らせることが可能になる

## 7-4 依存関係をコントロールする

※JS/TS では DI コンテナ関係の実装に手間がかかるため、本節は読み進めるだけに留める

- UserApplicationService がテスト用のリポジトリを利用してほしいのか、それともリレーショナルデータベースに接続するプロダクションようのリポジトリを利用してほしいのかどうかは、ときと場合による
- 重要なのはどれを扱うかではなく、それをどのようにして制御するか
- 依存関係をコントロールする手段について確認していく
- あまり良くない例を見ていく [サンプルコード](https://github.com/nrslib/itddd/blob/master/SampleCodes/Chapter7/_06/UserApplicationService.cs)
  - UserApplicationService をインスタンス化する際に、フィールドの userRepository をプロダクション用リポジトリ/テスト用のリポジトリに都度切り替えている
  - リポジトリを切り替える単調な作業が必要になる
- こういった問題を解決するために以下のパターンがある
  - Service Locator パターン
  - IoC Container パターン

### Service Locator パターン

- Service Locator パターンは ServiceLocator パターンと呼ばれるオブジェクトに依存解決先となるオブジェクトを事前に登録しておき、インスタンスが必要となる各所で ServiceLocator を経由してインスタンスを取得するパターン
- 導入しやすい反面、アンチパターンと呼ばれている
  - 依存関係が外部から見えづらくなる
  - テストの維持が難しくなる

### IoC Container パターン

- まず Dependency Injection（依存の注入）について知る必要がある
- 依存の注入はこんな感じ

```ts
const userRepository = new InMemoryUserRepository();
const userApplicationService = new UserApplicationService(userRepository);
```

- コードの例のようなやり方は便利な一方で、依存するオブジェクトのインスタンス化をあちこちに記述する必要が出てくる
- この問題を活躍するのが IoC Container パターン [サンプルコード](https://github.com/nrslib/itddd/blob/master/SampleCodes/Chapter7/_17/Program.cs)

## 7-5 まとめ

- 依存関係はソフトウェアを構築する上で自然と発生するもの
  - しかしその取り扱い方を間違えると手の施しようがないほど硬直したソフトウェアを生み出してしまう
- ソフトウェアは本来柔軟なもの
  - 利用者を取り巻く環境の変化に対応し、利用者を助けるために柔軟に変化させるべき
- 依存の方向性は開発者が絶対的にコントロールできるもの
- 本章で学んだようにドメインを中心にして、主要なロジックを技術的な要素に依存させないように仕立てあげ、ソフトウェアの柔軟性を保つことを目指すべき
