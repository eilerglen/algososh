import { swap } from "../../utils/utils";
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
export const stringReverseAlgo = (str: string, step?: number) => {
  let stepCounter = 0
  const resArray = str.split("").map(item => item)
  let end = resArray.length - 1;
  for (let start = 0; start <= end; start++) {
    // if(start === end) break
    swap(resArray, start, end)
    end--
    stepCounter++
  }
  return stepCounter
};
