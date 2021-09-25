interface IUseCaseUserRepository {
  save: (user: UseCaseUser) => void;
  delete: (user: UseCaseUser) => void;
  findOnId: (userId: UseCaseUserId) => UseCaseUser;
  findOnName: (userName: UseCaseUserName) => UseCaseUser;
}
