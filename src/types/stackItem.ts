import { TStatusObject } from "./statusObject";

export interface StackObject {
  letter: string | null;
  state: TStatusObject;
  head?: "top";
}
