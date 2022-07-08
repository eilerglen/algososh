import {Queue} from './utils'

describe("Check instance of class Stack", () => {
  const queue = new Queue(3)
  
  it("Check push item to empty queue", () => {
    queue.enqueue(1)
    expect(queue.getHead()).toBe(0)
    expect(queue.getTail()).toBe(0)
   
  })

  it("Check push item to queue", () => {
    queue.enqueue(2)
    expect(queue.getHead()).toBe(0)
    expect(queue.getTail()).toBe(1)
   
  })
  it("Check push item to queue", () => {
    queue.enqueue(3)
    expect(queue.getHead()).toBe(0)
    expect(queue.getTail()).toBe(2)
   
  })
  it("Check remove item to queue", () => {
    queue.dequeue()
    expect(queue.getHead()).toBe(1)
  
  })

  it("Check remove item to queue", () => {
    queue.dequeue()
    expect(queue.getHead()).toBe(2)
  
  })

  it("Check clear item to queue", () => {
    queue.clear()
    expect(queue.isEmpty).toBeTruthy
    expect(queue.getHead()).toBe(0)
    expect(queue.getHead()).toBe(0)
  
  })

 
  // it("Check pop item to stack", () => {
  //   stack.pop()
  //   expect(stack.peak()).toBe(1)
  
  // })
  // it("Check clear stack", () => {
  //   stack.clear()
  //   expect(stack.getSize()).toBeNull
  
  // })
})