import { reverse } from "dns/promises";
import { findConfigFile } from "typescript";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  addToHead: (value: T) => void;
  addToTail: (value: T) => void;
  deleteHead: () => void
  deleteTail: () => void
  getNodeToIndex: (index: number) => T | null;
  insertFromPosition: (value: T, index: number) => void;
  removeFromPosition: (index: number) => T | null;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  size: number;

  constructor(initArr: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initArr?.forEach(item => this.insertFromPosition(item, 0))
  }
 // Добавить в начало
  addToHead = (value: T) => {
    let node = new Node<T>(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
    return this;
  };

  // Добавить в конец
  addToTail = (value: T) => {
    let node = new Node<T>(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
    return this;
  };

  deleteHead() {
    // Если нет head значит список пуст.
    if (!this.head) {
      return null;
    }
  
    const deletedHead = this.head;
  
    // Если у head есть ссылка на следующий "next" узел
    // то делаем его новым head.
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      // Если у head нет ссылки на следующий "next" узел
      // то мы удаляем последний узел.
      this.head = null;
      this.tail = null;
    }
  
    return deletedHead;
  }
  
  deleteTail() {
    // Если нет tail, значит список пуст.

    if (!this.tail) {
      return null;
    }

    // Сохраняем значение последнего узла.
    const deletedTail = this.tail;

    // Если head и tail равны, значит в списке только один узел.
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // Если в связном списке много узлов.
    // Перебираем все узлы и находим предпоследний узел,
    // убираем ссылку «next» на последний узел.
    let currentNode = this.head;
    while (currentNode) {
      //Если элемент ссылается на tail, то делаем его tail и его next обнуляем.
      if (currentNode.next === this.tail) {
        this.tail = currentNode;
        currentNode.next = null;
        this.size--;
        return this;
      }
      //Перебираем элементы в цикле while выше.
      currentNode = currentNode.next;
      // В данном случае currentNode - это предпоследний узел или head,
      // который становится последним узлом.
      this.tail = currentNode;

      return deletedTail;
    }
  }

  //Вставка по индексу
  insertFromPosition(value: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      let node = new Node<T>(value);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let current = this.head;
        let currentIndex = 0;
        let prev = null;
        while (currentIndex < index && current) {
          prev = current;
          current = current.next;
          currentIndex++;
        }
      }
    }
  }

  getSize() {
    return this.size;
  }

  //Удаление по индексу
  removeFromPosition(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;

    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) prev.next = curr.next;
    }

    this.size--;
    return curr ? curr.value : null;
  }

  //Получить элемент по индексу
  getNodeToIndex(index: number) {
    let current = this.head
    let currentIndex = 0

    while(currentIndex < index && current) {
      current = current.next
      currentIndex++
    }
    return current ? current.value : null
  }

  //Вывести значение
  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }

}
