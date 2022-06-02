import { QueueObject } from "../../types/queueItem";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";

export class Queue {
  values: Array<QueueObject>;
  head: number;
  tail: number;
  constructor(num: number) {
    this.values = Array.from({ length: num }, () => {
      return {
        char: "",
        state: TStatusObject.Default,
      }
    });
    this.head = -1;
    this.tail = -1;
  }

  isEmpty = () => {
    return this.head === -1;
  }

  private isEmptyElem = (ind: number) => {
    return !this.values[ind].char;
  }

  getTail = () => {
    return this.tail;
  }

  private setTail = (ind: number) => {
    this.tail = ind;
  }

  getHead = () => {
    return this.head;
  }

  private setHead = (ind: number) => {
    this.head = ind;
  }

  async enqueue(newvalue: string, setStackValues: Function) {
    //Добавить в пустую очередь первое значение.
    if (this.isEmpty()) {
      this.values[0] = { char: newvalue, state: TStatusObject.Changing }
      setStackValues([...this.values])
      await pause(SHORT_PAUSE);
      this.values[0] = { char: newvalue, state: TStatusObject.Default }
      this.setHead(0);
      this.setTail(0);
    }
    //Добавить значение в 0 индекс при заполнении очереди до конца.
    else if (this.getTail() === this.values.length - 1 && this.isEmptyElem(0)) {
      this.values[0] = { char: newvalue, state: TStatusObject.Changing }
      setStackValues([...this.values])
      await pause(SHORT_PAUSE);
      this.values[0] = { char: newvalue, state: TStatusObject.Default }
      this.setTail(0);
    }
    //Добавить значение в следующий индекс.
    else if (this.getTail() + 1 < this.values.length && this.isEmptyElem(this.getTail() + 1)) {
      this.values[this.getTail() + 1] = { char: newvalue, state: TStatusObject.Changing }
      setStackValues([...this.values])
      await pause (SHORT_PAUSE);
      this.values[this.getTail() + 1] = { char: newvalue, state: TStatusObject.Default }
      this.setTail(this.getTail() + 1);
    }
    setStackValues([...this.values])
  }

  async dequeue(setStackValues: Function) {
    //Анимация элементов.
    this.values[this.getHead()].state =TStatusObject.Changing;
    setStackValues([...this.values])
    await pause(SHORT_PAUSE);
    this.values[this.getHead()].state = TStatusObject.Default;
    //Удаление последнего значения.
    if (this.getHead() === this.getTail()) {
      this.values[this.getHead()].char = "";
      this.setTail(-1);
      this.setHead(-1);
      setStackValues([...this.values]);
    }
    //Удаление следующего значения.
    else if (this.getHead() !== -1 && this.getHead() + 1 < this.values.length) {
      this.values[this.getHead()].char = "";
      this.setHead(this.getHead() + 1)
      setStackValues([...this.values]);
    }
    //Удаление последнего значения с переходом на нулевой индекс.
    else if (this.getHead() === this.values.length - 1) {
      this.values[this.getHead()].char = "";
      this.setHead(0);
      setStackValues([...this.values]);
    }
  }

  clear(setStackValues: Function) {
    if (!this.isEmpty()) {
      this.values.map((el) => el.char = "")
      this.setHead(-1);
      this.setTail(-1);
    }
    setStackValues([...this.values]);
  }
}