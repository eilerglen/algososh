import { TStatusObject } from "./statusObject";

export interface StackObject {
  char: string;
  state: TStatusObject;
  head?: "top";
}
