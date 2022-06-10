import { TStatusObject } from "./enums/statusObject";

export interface IStackObject {
  char?: string | null;
  state: TStatusObject;
  head?: "top";
}
