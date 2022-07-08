import { LinkedList } from './utils'

describe("Check instance of class Stack", () => {
  const testArr= [1,2,3,4]
  const linkedList = new LinkedList(testArr)
  
  it("Check addTohead item to linkedList", () => {
    linkedList.addToHead(0)
    expect(linkedList.getNodeToIndex(0)).toBe(0)
    
  })

  it("Check addToTail item to linkedList", () => {
    linkedList.addToTail(5)
    expect(linkedList.getNodeToIndex(5)).toBe(5)
    
  })

  it("Check deleteHead item to linkedList", () => {
    linkedList.deleteHead()
    expect(linkedList.getSize()).toBe(5)
    
  })
  it("Check deleteTail item to linkedList", () => {
    linkedList.deleteTail()
    expect(linkedList.getSize()).toBe(4)
    
  })
  it("Check insertFromIndex item to linkedList", () => {
    linkedList.insertFromPosition("F", 1)
    expect(linkedList.getNodeToIndex(1)).toBe("F")
    
  })
  it("Check deleteFromIndex item to linkedList", () => {
    linkedList.removeFromPosition(1)
    expect(linkedList.getSize()).toBe(4)
    
  })
})  