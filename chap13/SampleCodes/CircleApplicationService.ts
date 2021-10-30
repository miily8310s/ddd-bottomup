import { Circle, CircleId, CircleName } from "./Circle";
import {
  CircleFullSpecification,
  IUserRepository,
} from "./CircleFullSpecification";

export interface ICircleRepository {
  save: (circle: Circle) => void;
  findById: (id: CircleId) => Circle;
  findByName: (name: CircleName) => Circle;
}

export class CircleJoinCommand {
  private userId: string;
  private circleId: string;
  constructor(userId: string, circleId: string) {
    // サークルに参加するユーザのID
    this.userId = userId;
    // 参加するサークルのID
    this.circleId = circleId;
  }
  public getUserId() {
    return this.userId;
  }
  public getCircleId() {
    return this.circleId;
  }
}

class CircleApplicationService {
  private readonly circleRepository: ICircleRepository;
  private readonly userRepository: IUserRepository;

  constructor(
    circleRepository: ICircleRepository,
    userRepository: IUserRepository
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
  }

  public join(command: CircleJoinCommand) {
    // ここでトランザクションを開始
    const id = new CircleId(command.getCircleId());
    const circle = this.circleRepository.findById(id);
    if (!circle) {
      throw new Error(`サークルが見つかりませんでした`);
    }
    const circleFullSpecification = new CircleFullSpecification(
      this.userRepository
    );
    if (circleFullSpecification.isSatisfiedBy) {
      throw new Error(`CircleFullException ${circle.getMembers()}`);
    }
    this.circleRepository.save(circle);
    // ここでトランザクション終わり
  }
}
