import { swap } from "../../utils/utils";
import { TStatusObject } from "../../types/statusObject";

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
export const stringReverseAlgo = async (arr: Array<ISymbolProps>, callback: Function, change: string, modified: string
) => {
  let end = arr.length - 1;
  for (let start = 0; start <= end; start++) {
    if (start === end) {
         callback(arr, change, start, end)
         callback(arr, modified, start, end)
        }
    await callback(arr, change, start, end);
    swap(arr, start, end);
    await callback(arr, modified, start, end);
    end--;

  }
  return arr;
};
