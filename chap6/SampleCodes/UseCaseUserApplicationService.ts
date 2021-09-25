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
}
