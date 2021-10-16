import { Circle, User } from "./Circle";
import { CircleName } from "./CircleName";

interface ICircleFactory {
  create: (name: CircleName, owner: User) => Circle;
}
