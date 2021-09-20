# ４章　不自然さを解決する「ドメインサービス」

- ドメインサービスは不自然さを解消する
- ドメインの概念をコードで表現しようとしたとき、値オブジェクトやエンティティの振る舞いとして定義すると違和感が生じることがある
  - こうした違和感があるものは、ドメインのものを表現したときより、ドメインの活動を表現したときに見られる傾向
  - 違和感のある振る舞いを値オブジェクトに無理やり実装すると、オブジェクトの責務を歪なものにしてしまう
- 違和感のある振る舞いは別のオブジェクト（＝ドメインサービス）として定義する必要がある

## 4-1 サービスが指し示すもの

- サービスとは何か？
- ソフトウェア開発の文脈で語られるサービスはクライアントのために何かを行うオブジェクト
- ドメイン駆動設計で取り沙汰されるサービスは大きく分けて２つ
  - ドメインのためのサービス（=ドメインサービス）
  - アプリケーションのためのサービス（=アプリケーションサービス、第６章を参照）

## 4-2 ドメインサービスとは

- システムには値オブジェクトやエンティティに記述すると不自然になる振る舞いがある
- ドメインサービスはそういった不自然さを解決する

### 不自然な振る舞いを確認する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap4/SampleCodes/4-2.ts)

- システムにおいてユーザー名の重複（同姓同名）を許さないケースがある
  - ドメインのルールなのでドメインオブジェクトとして定義する必要がある
- ユーザーの重複確認をエンティティであるユーザーオブジェクトに記述すると不自然になる
  - 自分自身で重複確認出来てしまうケース（サンプルコード L40）
  - 重複確認用のユーザーオブジェクトのインタンスを別途生成し、特定のユーザーと重複確認するケース（サンプルコード L51）

### 不自然さを解決するオブジェクト

- 不自然さの解消のためにユーザーのドメインサービスを用意
- ドメインサービスは値オブジェクトやエンティティと異なり、自身の振る舞いを変更するようなインスタンス特有の状態をもたないオブジェクト

## 4-3 ドメインサービスの濫用が行き着く先

- ドメインサービスへの記述は「エンティティや値オブジェクトへの記述だと不自然なふるまい」に限定することが大切
- 実は「不自然なふるまい」も含めたすべての振る舞いはドメインサービスに記述できてしまう
  - これを無思慮に実際のコードへ実現してしまうと、エンティティや値オブジェクトが無口なオブジェクトになってしまう
  - ドメインオブジェクトに本来記述されるべき知識やふるまいが、ドメイン/アプリケーションサービスに記述され、かたるべきことをなにも語っていないドメインオブジェクトの状態=ドメインモデル貧血症

### 可能な限りドメインサービスを避ける

- ふるまいをエンティティや値オブジェクトに定義するべきか、それともドメインサービスに定義するべきか、迷いが生じたら可能な限りドメインサービスは使用しない
- まずはエンティティや値オブジェクトに定義するべき

## 4-4 エンティティや値オブジェクトとともにユースケースを組み立てる

- ドメインサービスは値オブジェクト/エンティティと組み合わせて利用される
- ここでユーザーを作成する処理を題材にユースケースを組み立てる
- Program クラスに CreateUser メソッド、ドメインサービスとして UserService クラスに Exists メソッド を実装
  - Exists メソッドでは DB に指定したユーザーがいるのか、SELECT 文を発行し有無を boolean 値で返す
  - CreateUser メソッドは Exists メソッドで作成しようとしているユーザーが重複していないことを確認してから、INSERT 文を使って DB にユーザー登録する流れ

## 4-6 まとめ

- ドメインにはドメインオブジェクトに実装すると不自然になるふるまいが必ず存在する
- こうした不自然なふるまいに対してはサービスとよばれるオブジェクトを活用する
- サービスは便利な存在で、ドメインオブジェクトに記述するべきふるまいもすべてサービスに移し替えることができる
- ふるまいやルールの記述に乏しいドメインモデル貧血症を起こさないように、そのふるまいがどこに記述されるべきかということに細心の注意を払う
- 一方でユースケースがデータストアの操作に終始してしまう課題が出てきた。これは次章で解説するリポジトリで解決できる