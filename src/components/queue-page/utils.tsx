import { QueueObject } from "../../types/queueItem";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import { threadId } from "worker_threads";

export const MAX_SIZE = 7

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => number
  getTail: () => number
  getHeadValue: () => { value: T | null; index: number } ;
  getTailValue: () => { value: T | null; index: number } ;
  getSize : () => number
}

export class Queue<T> implements IQueue<T>{
 private container: ( T | null)[]=[]
  head: number = 0
  tail: number = 0
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size
    this.container = Array(size)
  }
  
  enqueue(value: T) {
    //Добавить в пустую очередь первое значение.
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    
    this.container[this.tail] = value;
    this.tail++;
    this.length++;
  
  }
  dequeue = () => {
    if(this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container.shift()
    this.head++;
    this.length--;
  }

  getHead = () => {
      if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.head
  }

  getTail = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.tail
  }
 
  getHeadValue = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.head], index: this.head };
  };

  getTailValue = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.tail-1], index: this.tail-1};
  };


  isEmpty = () => this.length === 0;

  // Получить значение по индексу
  
  getValue = (ind: number) => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[ind]
  }

 
  getSize = () => this.size;

  private setHead = (ind: number) => {
    this.head = ind;
  }

}