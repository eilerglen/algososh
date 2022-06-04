import { TStatusObject } from "./statusObject";

export interface listItemProps {
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  tail?: string;
  head?: string;
  char?: string;
  state: TStatusObject;
  extraCircle?: {
    char: string;
  }
}
