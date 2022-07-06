import { fibbonachi } from "./utils";

describe("Check stepCounter", ()=> {
  it("test func fibbonachi return 1", ()=> {
    expect(fibbonachi(1)).toBe(1)
  })
  it("test func fibbonachi return 1", ()=> {
    expect(fibbonachi(2)).toBe(1)
  })
  it("test func fibbonachi return 2", ()=> {
    expect(fibbonachi(3)).toBe(2)
  })
  it("test func fibbonachi return 3", ()=> {
    expect(fibbonachi(4)).toBe(3)
  })


})

