// 無口なコード
class SilentEntityUser {
  private name: string | undefined;

  constructor(name: string) {
    this.name = name;
  }
}

// 饒舌なコード
class TalkativeEntityUser {
  private name: string | undefined;

  constructor(name: string) {
    // ユーザー名のルールが自明
    if (!name) throw new Error("ArgumentNullException");
    if (name.length < 3) throw new Error(`ユーザ名は3文字以上です ${name}`);

    this.name = name;
  }
}
