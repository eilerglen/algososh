
export const MAX_SIZE = 7

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => number
  getTail: () => number
  getValue: (ind: number) => any
  isEmpty: () => boolean
}

export class Queue<T> implements IQueue<T> {
 private container: ( T | null)[]=[]
  head: number = 0
  tail: number = 0
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size
  }
  
  enqueue(value: T) {
    //Добавить в пустую очередь первое значение.
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    // this.container[this.tail] = value
    this.container.push(value)
    this.tail++;
    this.length++;
  
  }
  dequeue = () => {
    if(this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = null
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
    return this.tail-1 
  }


  getValue = (ind: number) => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[ind]
  }

  isEmpty = () => this.length === 0;

  
  isEmptyElem = (ind: number) => {
    return !this.container[ind];
  }

  getSize = () => this.size;

}