import { Circle, CircleId, CircleName } from "./Circle";
import {
  CircleFullSpecification,
  IUserRepository,
} from "./CircleFullSpecification";
import { CircleRecommendSpecification } from "./CircleRecommendSpecification";

export interface ICircleRepository {
  save: (circle: Circle) => void;
  findAll: () => Circle[];
  findById: (id: CircleId) => Circle;
  findByName: (name: CircleName) => Circle;
  findRecommended: (now: Date) => Circle[];
}

interface CircleGetRecommendRequest {}

class CircleSummaryData {
  private id: string;
  private name: string;
  constructor(circle: Circle) {
    this.id = circle.getId().getValue();
    this.name = circle.getName().getValue();
  }
}
class CircleGetRecommendResult {
  constructor(recommendCircles: Circle[]) {
    return recommendCircles.map(
      (recommendCircle) => new CircleSummaryData(recommendCircle)
    );
  }
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
  private readonly now: Date;

  constructor(
    circleRepository: ICircleRepository,
    userRepository: IUserRepository
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
    this.now = new Date();
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
  public getRecommendResult(
    request: CircleGetRecommendRequest
  ): CircleGetRecommendResult {
    const circles = this.circleRepository.findAll();
    const recommendCircleSpec = new CircleRecommendSpecification(this.now);
    const recommedCircles = circles.filter((circle) =>
      recommendCircleSpec.isSatisfiedBy(circle)
    );
    return new CircleGetRecommendResult(recommedCircles);
  }
}
