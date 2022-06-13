import { TStatusObject } from "./enums/statusObject";

export interface QueueObject {
  char?: string | null;
  state: TStatusObject;
  tail?: string;
  head?: string;
}
