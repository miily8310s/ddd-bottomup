class UseCaseUserService {
  private userRepository: IUseCaseUserRepository;
  constructor(userRepository: IUseCaseUserRepository) {
    this.userRepository = userRepository;
  }
  // ユーザーの重複を確認するメソッド
  public exists(user: UseCaseUser) {
    // リポジトリでデータストアに重複したユーザーがいないか確認
    const found = this.userRepository.findOnName(user.userName());
    return found !== null;
  }
}
