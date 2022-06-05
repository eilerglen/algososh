import { TStatusObject } from "./statusObject";

export interface StackObject {
  char: string | null;
  state: TStatusObject;
  head?: "top";
}
