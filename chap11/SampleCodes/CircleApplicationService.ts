import { IUserRepository, UserId } from "./Circle";
import { CircleCreateCommand } from "./CircleCreateCommand";
import { ICircleFactory } from "./CircleFactory";
import { CircleId } from "./CircleId";
import { CircleJoinCommand } from "./CircleJoinCommand";
import { CircleName } from "./CircleName";
import { ICircleRepository } from "./CircleRepository";
import { CircleServices } from "./CircleService";

class CircleApplicationService {
  private readonly circleFactory: ICircleFactory;
  private readonly circleRepository: ICircleRepository;
  private readonly circleServices: CircleServices;
  private readonly userRepository: IUserRepository;

  constructor(
    circleFactory: ICircleFactory,
    circleRepository: ICircleRepository,
    circleServices: CircleServices,
    userRepository: IUserRepository
  ) {
    this.circleFactory = circleFactory;
    this.circleRepository = circleRepository;
    this.circleServices = circleServices;
    this.userRepository = userRepository;
  }

  public create(command: CircleCreateCommand) {
    // ここでトランザクションを開始
    const ownerId = new UserId(command.getUserId());
    const owner = this.userRepository.find(ownerId);
    if (!owner) {
      throw new Error(
        `サークルのオーナーとなるユーザが見つかりませんでした ${ownerId}`
      );
    }
    const name = new CircleName(command.getCircleName());
    const circle = this.circleFactory.create(name, owner);
    if (this.circleServices.exists(circle)) {
      throw new Error(`サークルは既に存在しています ${circle}`);
    }
    this.circleRepository.save(circle);
    // ここでトランザクション終わり
  }
  public join(command: CircleJoinCommand) {
    // ここでトランザクションを開始
    const memberId = new UserId(command.getUserId());
    const member = this.userRepository.find(memberId);
    if (!member) {
      throw new Error(`ユーザが見つかりませんでした ${memberId}`);
    }
    const id = new CircleId(command.getCircleId());
    const circle = this.circleRepository.findById(id);
    if (!circle) {
      throw new Error(`サークルが見つかりませんでした`);
    }
    circle.getMembers().push(member);
    if (circle.getMembers().length >= 29) {
      throw new Error(`CircleFullException ${circle.getId()}`);
    }
    this.circleRepository.save(circle);
    // ここでトランザクション終わり
  }
}
