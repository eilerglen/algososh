
export const MAX_SIZE = 7

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => number
  getTail: () => number
  getValue: (ind: number) => any
  isEmpty: () => boolean
  clear: () => void
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
    if(this.isEmpty()) {
      this.container.push(value)
      this.length++;
    }
    // this.container[this.tail] = value
    
    else {
      // this.container[this.tail] = value
      this.container.push(value)
      this.tail++;
      this.length++;
    }
  
  }
  dequeue = () => {
    if (this.getHead() === this.getTail()) {
      this.container.length = 0;
      this.tail = 0
      this.head = 0;
    }
    this.container[this.head] = null
    this.head++;
    this.length--;
  }

  getHead = () => {

    return this.head
  }

  getTail = () => {
    return this.tail
  }


  getValue = (ind: number) => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[ind]
  }

  isEmpty = () =>  this.container.length === 0;

  
  getSize = () => this.size;

  clear = () => {
    this.container.length = 0
    this.head = 0
    this.tail = 0
  }
}