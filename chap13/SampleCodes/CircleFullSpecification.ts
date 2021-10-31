import { User, UserId, Circle } from "./Circle";

export interface IUserRepository {
  save: (user: User) => void;
  find: (userId: UserId[]) => User[];
}

export class CircleFullSpecification {
  private readonly userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public isSatisfiedBy(circle: Circle) {
    const users = this.userRepository.find(circle.getMembers());
    const premiumUserNumber = users.map((user) => user.getIsPremium()).length;
    const circleUpperLimit = premiumUserNumber < 10 ? 30 : 50;
    return circle.getMembers().length > circleUpperLimit;
  }
}
