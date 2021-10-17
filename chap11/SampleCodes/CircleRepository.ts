import { Circle } from "./Circle";
import { CircleId } from "./CircleId";
import { CircleName } from "./CircleName";

export interface ICircleRepository {
  save: (circle: Circle) => void;
  findById: (id: CircleId) => Circle;
  findByName: (name: CircleName) => Circle;
}
