import { debug } from "console";
import { stringReverseAlgo } from "./utils";

describe("Check stepCounter", ()=> {
  let testString = "1234"
  const steps = stringReverseAlgo(testString)
  it("Check step of even", ()=> {
    expect(steps).toBe(2)
  })

})

describe("Check stepCounter", ()=> {
  let testString = "1234567"
  const steps = stringReverseAlgo(testString)
  it("Check step of even", ()=> {
    expect(steps).toBe(3)
  })
})