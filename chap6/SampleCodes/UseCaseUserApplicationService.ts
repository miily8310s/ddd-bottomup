class UseCaseUserApplicationService {
  private userRepository: IUseCaseUserRepository;
  private userService: UseCaseUserService;
  constructor(
    userRepository: IUseCaseUserRepository,
    userService: UseCaseUserService
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }
  public register(userName: string) {
    const user = new UseCaseUser(new UseCaseUserName(userName));
    const userService = new UseCaseUserService(this.userRepository);
    // セットしたリポジトリを経由してユーザーの重複を確認
    if (userService.exists(user)) {
      throw new Error(`${userName}は既に存在しています`);
    }
    // 重複確認にも使ったリポジトリを使ってデータストアに保存
    this.userRepository.save(user);
  }
  // Userオブジェクトを返さないように注意(changeNameメソッドがクライアント側から呼べるようになってしまうため)
  // DTOを返すようにする
  public getUser(userId: string) {
    const targetId = new UseCaseUserId(userId);
    const user = this.userRepository.findOnId(targetId);
    if (!user) {
      return null;
    }
    return new UseCaseUserData(user);
  }
  public updateUser(command: UseCaseUserUpdateCommand) {
    const targetId = new UseCaseUserId(command.getId());
    const user = this.userRepository.findOnId(targetId);
    if (!user) {
      return null;
    }
    const userName = command.getName();
    // updateCommandにnameが渡されているときだけ更新
    if (userName !== null) {
      const newUserName = new UseCaseUserName(userName);
      user.changeName(newUserName);
      if (this.userService.exists(user)) {
        throw new Error(`${userName}は既に存在しています`);
      }
    }
    // updateCommandにmailAddressが渡されているときだけ更新
    const mailAddress = command.getMailAddress();
    if (mailAddress !== null) {
      const newMailAddress = new UseCaseMailAddress(mailAddress);
      user.changeMailAddress(newMailAddress);
    }
    this.userRepository.save(user);
  }
}
