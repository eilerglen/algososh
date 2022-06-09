import { swap} from "../../utils/utils";
import { TStatusObject} from "../../types/statusObject";

export interface ISymbolProps {
  symbol: string;
  state: TStatusObject;
}
  
  //Изменить статус/внешний вид символов.
  export const changeState = (arr: any, status: string, start: number, end?: number) => {
    arr[start].state = status;
    if (end) {
      arr[end].state = status;
    }
  }

  //Изменить статус/внешний вид символов.
  export const stringReversePro = async (arr: Array<ISymbolProps>, callback: Function, status: string) => {
    let step = 0
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      callback(arr, status)
      swap(arr, start, end);
      end--;
      step++
    }
    return arr
  }
