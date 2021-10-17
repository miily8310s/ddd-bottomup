import { Circle, User } from "./Circle";
import { CircleName } from "./CircleName";

export interface ICircleFactory {
  create: (name: CircleName, owner: User) => Circle;
}
