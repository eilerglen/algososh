import { SHORT_PAUSE } from '../../constants/pauseLimits';
import {StackObject} from '../../types/stackItem'
import { TStatusObject } from "../../types/statusObject";
import { pause } from '../../utils/utils';

interface IStack<T> {
  push: (item: StackObject) => void;
  pop: () => void;
}

export class Stack<T> implements IStack<T> {
  callbackPush: () => void;
  callbackPop: () => void;
  stackValues: Array<StackObject>;
  

  constructor(
    callbackPush: () => void,
    callbackPop: () => void,
    stackValues: any[],
   
  ) {
    this.callbackPush = callbackPush;
    this.callbackPop = callbackPop;
    this.stackValues = stackValues;
    
  }

  push = async (item: StackObject) => {
    this.stackValues.push(item);
    this.callbackPush(); // Колбэк
  };

  pop = async () => {
    if (this.stackValues.length > 1) {
      this.callbackPop();// Колбэк
      await pause(SHORT_PAUSE)
      this.stackValues.pop();
    }  
  };
}
