# ６章 ユースケースを実現する「アプリケーションサービス」

- アプリケーションサービスはドメインオブジェクトを強調させてユースケースを実現する
- ドメインオブジェクトはドメインモデルをコードによって表現したオブジェクト
  - ex）値オブジェクト、エンティティ
- ソフトウェアとして利用者の問題を解決するためには、これらのドメインオブジェクトをまとめ上げて問題を解決するように導く必要がある
- アプリケーションサービスはドメインオブジェクトが行うタスクの進行を管理し、問題の解決に導くもの

## 6-1 アプリケーションサービスとは

- ４章：不自然さを解決する「ドメインサービス」でも触れた２つ目のサービス
- アプリケーションサービス＝ユースケースを実現するオブジェクト
- 例えばユーザ登録の必要なシステムにおいて、ユーザ機能を実現するには次のユースケースが必要になる
  - 「ユーザを登録する」ユースケース
  - 「ユーザを変更する」ユースケース
- ユーザ機能のアプリケーションサービスはこれらのユースケースに従って、次のふるまいが定義される
  - 「ユーザを登録する」ふるまい
  - 「ユーザを変更する」ふるまい
- これらのふるまいは実際にドメインオブジェクトを組み合わせて実行するスクリプトのようなふるまい
- 本章ではこうしたユーザ機能に必要なユースケースを作成する過程を確認することで、アプリケーションサービスがどういったものか確認していく

## 6-2 ユースケースを組み立てる

- アプリケーションサービスのサンプルとして本章では SNS のユーザ機能を取り上げる
- システムとして成り立たせるために開発しなくてはならないものを洗い出すため、まずはユーザ機能がどういったものかを確認する
- ユーザ機能を実現するには次の４つのユースケースが必要
  - ユーザを登録する
  - ユーザ情報を取得する
  - ユーザ情報を更新する
  - ユーザを退会する
- これらの処理はいわゆる CRUD（CREATE, READ, UPDATE, DELETE）処理

### ドメインオブジェクトから準備する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap6/SampleCodes/)
の UseCaseUser.ts/UseCaseUserService.ts/IUseCaseUserRepository.ts

- まずはアプリケーションサービスが取り扱うドメインオブジェクトを準備
- 今回のユーザーの概念はライフサイクルがあるモデルなので、エンティティとして実装される
- User にはシステム固有の値オブジェクトとして UserId とユーザ名を定義
- ユーザの重複がないことを確認するために、ドメインサービスも用意
- さらにユーザの永続化や再構築を行うためにリポジトリも必要
  - この段階ではリポジトリはインターフェイスの定義のみで OK
  - 実装クラスはまだ用意する必要はなし

### ユーザ登録処理を作成する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap6/SampleCodes/)
の UseCaseUserApplicationService.ts

- 最初にユーザ登録処理のアプリケーションサービスを実装
- Register メソッドでは最初に User オブジェクトを生成し、UserService に重複チェックをお願いしている
- そして重複しないことを確認した場合、IUserRepository にインスタンスの永続化を依頼
- こうしてユーザの登録を完了する
- なお今回アプリケーションサービスとして定義した UseCaseUserApplicationService クラスは[第５章](https://github.com/miily8310s/ddd-bottomup/blob/master/chap5/SampleCodes/5-2.ts)で出てきた RepositoryProgram クラスと同じコード

### ユーザ情報取得処理を作成する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap6/SampleCodes/)
の UseCaseUser.ts/UseCaseUserService.ts/IUseCaseUserRepository.ts

- ユーザ情報の取得処理をアプリケーションサービスに追加する
- ユーザ情報取得処理はユーザ登録処理と異なり、結果を返却する必要がある
- このとき結果として返却されるオブジェクトが、ドメインオブジェクトをそのまま戻り値として返却するか否かの選択は重要な分岐点
- ドメインオブジェクトをそのまま返却する選択肢を選んでみる
  - アプリケーションサービスの実装コードは比較的シンプルに
  - しかし同時にわずかな危険性をはらむ
  - この危険性はアプリケーションサービスを利用するクライアントで起こりうる
- アプリケーションサービス以外のオブジェクトがドメインオブジェクトの直接のクライアントとなって自由に操作できてしまう問題が発生している
- ドメインオブジェクトの振る舞いを呼び出す役目はアプリケーションサービスが取るべき
- ドメインオブジェクトを外部に向けて公開するのを防ぐ選択肢として、データ転送用オブジェクト（DTO、Data Transfer Object）がある
- 今回なら、クライアントで返却するオブジェクトをドメインオブジェクトの代わりに DTO を返すようにする
- DTO はそのクラス自他を定義する手間とデータの移し替えを行うため、ドメインオブジェクトを直接公開した場合に比べるとパフォーマンス上劣る部分がある
  - ただしよほど大量の移し替えをしなければ、手間は微々たるもの
- ドメインオブジェクトを公開するか否かは大きな分岐点
  - どちらを採用するかはプロジェクトのポリシーによる
  - その選択はソフトウェアの未来を左右する可能性の秘めた決定事項であることを認識した上で決定を下すべき

### ユーザ情報更新処理を作成する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap6/SampleCodes/)
の UseCaseUserUpdateCommand.ts

- 更新処理では項目ごとに別々のユースケースとするか、それとも単一のユースケースで複数項目を同時更新できるようにするかは悩ましい問題
- 今回は複数項目を同時に更新できるユースケースをサンプルにする
- User オブジェクトの情報に今後もユーザ名以外にもぱパラメータが増えたらどのように変化するのか？
- 情報変更にあたってユーザ名だけ、メールアドレスだけを変更したいときもある
- ユーザ情報が追加されるたびにアプリケーションサービスのメソッドのシグネチャが変更されることになる
- これを避ける方法としてコマンドオブジェクトを用いる戦術がある
- コマンドオブジェクトを作ることは間接的にアプリケーションサービスの処理を制御することと同義

### 退会処理を作成する

[サンプルコード](https://github.com/miily8310s/ddd-bottomup/blob/master/chap6/SampleCodes/)
の UseCaseUserDeleteCommand.ts

- 退会処理はリポジトリから対象となるインスタンスの復元を行い、そのインスタンスの削除をリポジトリに依頼するだけのシンプルなスクリプト

## 6-3 ドメインのルールの流出

- アプリケーションサービスはあくまでもドメインオブジェクトのタスク調整に徹するべき
  - なのでアプリケーションサービスにはドメインのルールは記述されるべきではない
  - もしドメインのルールをアプリケーションサービスに記述してしまうと、同じようなコードを点在させることにつながる
- たとえばユーザの重複を許さないルールはドメインにおける重要なルール
  - ユーザ登録処理にもユーザ情報更新処理に追いてもこれを確認する必要がある
- しかしこの「ユーザの重複を許さない」ルールが変更されたときはどうなる？
- そして今後コードの量が増えてきたらどうする？
  - 修正すべき箇所を網羅できず、結果として修正漏れ、つまりバグを引き起こしてしまうのが目に見えている
- この問題を解決するには、ユーザの重複を確認するというドメインのルールをアプリケーションサービスに記述しないこと
- ドメインのルールはドメインオブジェクトへ、アプリケーションサービスはそのドメインオブジェクトを利用するよう仕立てる
  - こうすることでもれなく修正を完了できる
- ルールをドメインオブジェクトに記述することは、同じルールが点在することを防ぎ、ひいては修正漏れを起因とバグを防ぐ効果がある

## 6-4 アプリケーションサービスと凝集度

- プログラムには凝集度という考えがある
- 凝集度：モジュールの責任範囲がどれだけ集中しているかを測る尺度
- 凝集度を高めると、モジュールが一つの事柄に集中する事になり、堅牢性・信頼性・再利用性・可読性の観点から好ましいとされている
- ただし、必ずしも凝集度を高めずに低くするほうが正解なこともある
- クラス設計をする上で、凝集度は一考の価値がある尺度

## 6-5 アプリケーションサービスのインターフェイス

- より柔軟性を担保するためにアプリケーションサービスのインターフェイスを用意することがある
- アプリケーションサービスを呼び出すクライアントはアプリケーションサービスの実態を直接呼び出すのではなく、インターフェイスを操作して処理を呼び出すようになる
- 例えばクライアント側の開発者とアプリケーション側の開発者で分業して開発を行うと、クライアント側の開発者はアプリケーションサービスの実装を待つことになる
  - 他の作業ができるならそれでいいが、ない場合クライアント側の開発者は待ちぼうけする羽目になる
  - アプリケーションサービスのインターフェイスを用意すれば、モックオブジェクトを利用してプロダクション用のアプリケーションサービスの実装を待たずして、開発をすすめることが可能になる
- それ以外にも、アプリケーションサービスで例外が発生したときのクライアント側の処理を実際にテストしたいといった要求にも答えることができる

## 6-6 サービスとは何か

- 第４章でドメインサービス、本章でアプリケーションサービスを確認した
- ここで改めてサービスとは何かを確認
- サービスはクライアントのために何かを行う（活動や行動）モノ
- 値オブジェクトやエンティティは自身のための振る舞いを持っているが、サービスは自身のための振る舞いを持たない
- サービスはどのような領域にも存在する
  - ドメインにおける活動：ドメインサービス
  - アプリケーションとして成り立たせるサービス：アプリケーションサービス
- ４章で登場したユーザの重複確認はドメインの活動、したがってドメインサービスで記述される
  - ドメインサービスはドメインの知識を表現したオブジェクト
- 本章で登場したユーザの登録・退会はアプリケーションを成り立たせるための操作、ドメインに存在する概念でもなく、ユーザ機能を新たに表現するために作られたもの
  - したがってアプリケーションサービスにて定義される
- ドメインサービスとアプリケーションサービスは本質的には同じ。サービスがあり、それの向いている方向がドメインであるか、アプリケーションであるかで分けられている

### サービスは状態をもたない

- サービスは自身の振る舞いを変化させる目的で状態を保持しない
- 状態を一切もっていないことを意味するわけではない
  - 自身のふるまいを変化させる状態を持ってはいけないのが正

## 6-7 まとめ

- ドメインモデルを表現するだけではアプリケーションとして完成しない
- アプリケーションサービスはドメインオブジェクトの操作に徹することでユースケースを実現する
- 知識を一箇所にまとめて変更を容易にするためにも、ドメインのルールはドメインオブジェクトに実装する
