
export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  clear: () => void
  peak: () => T | null
}

export class Stack<T> implements IStack<T> {
  private container: T[] = []

  push = async (item: T) => {
    this.container.push(item);
  };

  pop = async () => {
    this.container.push();
  };

  peak = () => {
    let size = this.getSize()
    if(size != 0 ) {
      return this.container[this.getSize() - 1]
    }
    else return null
  }

  getSize = () => this.container.length;
  clear = () => this.container.length = 0
}
