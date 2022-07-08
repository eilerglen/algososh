import { TStatusObject } from "../../types/enums/statusObject";

export interface ISymbolProps {
  symbol: string;
  state: TStatusObject;
}

//Изменить статус/внешний вид символов.
export const changeState = (
  arr: any,
  status: string,
  start: number,
  end: number
) => {
  arr[start].state = status;
  if (end) {
    arr[end].state = status;
  }
};

//Изменить статус/внешний вид символов.
export const stringReverseAlgo = (str: string) => {
  let stepCounter = 0
  
  let end = str.length - 1;
  for (let start = 0; start <= end; start++) {
    if(start === end) continue
    end--
    stepCounter++
  }
  console.log(stepCounter)
  return stepCounter
};
