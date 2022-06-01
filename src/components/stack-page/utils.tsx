import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
}

export class Stack<T> implements IStack<T> {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setStackValues: React.Dispatch<React.SetStateAction<any[]>>;
  callbackPush: () => void;
  callbackPop: () => void;
  stackValues: any;
  inputValue: string;

  constructor(
    callbackPush: () => void,
    callbackPop: () => void,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setStackValues: React.Dispatch<React.SetStateAction<any[]>>,
    stackValues: any[],
    inputValue: string
  ) {
    this.callbackPush = callbackPush;
    this.callbackPop = callbackPop;
    this.setInputValue = setInputValue;
    this.setStackValues = setStackValues;
    this.stackValues = stackValues;
    this.inputValue = inputValue;
  }

  push = async () => {
    this.stackValues.push({
      char: this.inputValue,
      state: TStatusObject.Changing,
      head: "top",
    });
    this.setStackValues([...this.stackValues]);
    this.callbackPush();
  };

  pop = async () => {
    if (this.stackValues.length > 1) {
      this.stackValues.pop();
      this.callbackPop();
      this.setStackValues([...this.stackValues]);
      await pause(SHORT_PAUSE);
      this.stackValues[this.stackValues.length - 1].state =
        TStatusObject.Changing;
      this.stackValues[this.stackValues.length - 1].head = "top";
      this.setStackValues([...this.stackValues]);
    } else this.setStackValues([]);
  };
}
