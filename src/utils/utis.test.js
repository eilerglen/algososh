import { generateRandomArr } from "./generateRandomArr";

describe("Check generateArr", ()=> {
  const {length} = generateRandomArr()
  it("check arr length", ()=> {
    expect(length).toBeGreaterThan(1) 
  })

})

