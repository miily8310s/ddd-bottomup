import { Circle } from "./Circle";

export class CircleRecommendSpecification {
  private readonly executeDateTime: Date;
  constructor(dateTime: Date) {
    this.executeDateTime = dateTime;
  }
  public isSatisfiedBy(circle: Circle) {
    if (circle.getMembers().length < 10) {
      return false;
    }
    return circle.getCreated() > this.executeDateTime.getMonth() - 1;
  }
}
