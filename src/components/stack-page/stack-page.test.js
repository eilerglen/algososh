import {Stack} from './utils'

describe("Check instance of class Stack", () => {
  const stack = new Stack()
  
  it("Check push item to stack", () => {
    stack.push(1)
    expect(stack.peak()).toBe(1)
    stack.push('hello')
    expect(stack.peak()).toBe("hello")
  })
 
  it("Check pop item to stack", () => {
    stack.pop()
    expect(stack.peak()).toBe(1)
  
  })
  it("Check clear stack", () => {
    stack.clear()
    expect(stack.getSize()).toBeNull
  
  })
})