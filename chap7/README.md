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
