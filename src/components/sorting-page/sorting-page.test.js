import {  bubbleSortAlgo } from "./utils/bubbleSort";
import {  selectionSortAlgo } from "./utils/selectionSort";

import { TStatusObject } from "./../../types/enums/statusObject"

let resArrDescending = [
  {  
    num: 7,
    state: TStatusObject.Modified,
  },
  {
    num: 4,
    state: TStatusObject.Modified,
  },
  {
    num: 2,
    state: TStatusObject.Modified,
  },
  {
    num: 1,
    state: TStatusObject.Modified,
  },
]

let resArrAscending = [
  {  
    num: 1,
    state: TStatusObject.Modified,
  },
  {
    num: 2,
    state: TStatusObject.Modified,
  },
  {
    num: 4,
    state: TStatusObject.Modified,
  },
  {
    num: 7,
    state: TStatusObject.Modified,
  },
]

let testObj = {
  resArrDescending: resArrDescending,
  resArrAscending:  resArrAscending,
  resEmpty: [],
  resArrOneElement: [
    {  
      num: 4,
      state: TStatusObject.Default,
    },
  ]
}


describe("Check algo for selectionSort", () => {
  let testArr;

  beforeEach(() => {
    testArr = [
    {  
      num: 4,
      state: TStatusObject.Default,
    },
    {
      num: 2,
      state: TStatusObject.Default,
    },
    {
      num: 7,
      state: TStatusObject.Default,
    },
    {
      num: 1,
      state:TStatusObject.Default,
    },

    ]
  })

  it("Check succecs sorting with option descending", () => {
    expect(selectionSortAlgo("descending", testArr).resultArray)
    .toStrictEqual(testObj.resArrDescending)
  })
  it("Check succecs sorting with option ascending", () => {
    expect(selectionSortAlgo("ascending", testArr).resultArray)
    .toStrictEqual(testObj.resArrAscending)
  })

})

describe("Check algo for bubbleSort", () => {
  let testArr;

  beforeEach(() => {
    testArr = [
    {  
      num: 4,
      state: TStatusObject.Default,
    },
    {
      num: 2,
      state: TStatusObject.Default,
    },
    {
      num: 7,
      state: TStatusObject.Default,
    },
    {
      num: 1,
      state:TStatusObject.Default,
    },

    ]
  })

  it("Check succecs sorting with option descending", () => {
    expect(bubbleSortAlgo("descending", testArr).resultArray)
    .toStrictEqual(testObj.resArrDescending)
  })
  it("Check succecs sorting with option ascending", () => {
    expect(bubbleSortAlgo("ascending", testArr).resultArray)
    .toStrictEqual(testObj.resArrAscending)
  })
  it("Check succecs sorting empty array", () => {
    expect(bubbleSortAlgo("ascending", []).resultArray)
    .toStrictEqual(testObj.resEmpty)
  })
  it("Check succecs sorting empty array", () => {
    expect(bubbleSortAlgo("ascending", testObj.resArrOneElement).resultArray)
    .toStrictEqual(testObj.resArrOneElement)
  })
  

})