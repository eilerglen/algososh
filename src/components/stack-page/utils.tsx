import {  SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause} from "../../utils/utils";

export class Stack {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setStackValues: React.Dispatch<React.SetStateAction<any[]>>;
  stackValues: any;
  inputValue: string;

  constructor(
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setStackValues: React.Dispatch<React.SetStateAction< any[]>>,
    stackValues: any[],
    inputValue: string
  ) {
    this.setInputValue = setInputValue;
    this. setStackValues =  setStackValues;
    this.stackValues = stackValues;
    this.inputValue = inputValue;
  }

  push = async () => {
    this.setInputValue("");
    this.stackValues.forEach((item: any) => {
      item.state =TStatusObject.Default;
      item.head = "";
    });
    this.stackValues.push({
      char: this.inputValue,
      state:TStatusObject.Default,
      head: "top",
    });
    this.setStackValues([...this.stackValues]);
    await pause( SHORT_PAUSE);
    this.stackValues[this.stackValues.length - 1].state =
    TStatusObject.Changing;
    this.setStackValues([...this.stackValues]);
   
  };

  pop = async () => {
    if (this.stackValues.length > 1) {
      this.stackValues.pop();
      this.setStackValues([...this.stackValues]);
      await pause(SHORT_PAUSE);
      this.stackValues[this.stackValues.length - 1].state =
        TStatusObject.Changing;
      this.stackValues[this.stackValues.length - 1].head = "top";
      this.setStackValues([...this.stackValues]);
    } else this.setStackValues([]);
    
  };
}


// interface IStack<T> {
//     push: (item: T) => void;
//     pop: () => void;
//     peak: () => T | null;
//     getSize: () => number;
//   }
  
//   export class Stack<T> implements IStack<T> {
//     constructor(
//         callbackPush
//         callbackPop
//         stackValues: any[],

//       ) {
//         this.stackValues = stackValues
//         this. callbackPush =  callbackPush
//         this. callbackPop =  callbackPop
//       }
    
//     push = (item: T): void => {
//       this.stackValues.push(item)
//       this.callbackPush(stackValue)
//       // ..
//     };
  
//     pop = (): void => {
//       if(this.stackValues.length != 0) {
//         this.stackValues.pop()
//         this.callbackPush(stackValue)
//       }
      
//     };
  
//   }