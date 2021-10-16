import { Circle } from "./Circle";
import { ICircleRepository } from "./CircleRepository";

export class CircleServices {
  private readonly circleRepository: ICircleRepository;
  constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }
  public exists(circle: Circle) {
    const duplicated = this.circleRepository.findByName(circle.getName());
    return duplicated !== null;
  }
}
