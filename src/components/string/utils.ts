import { swap} from "../../utils/utils";
import { TStatusObject} from "../../types/statusObject";

interface symbolProps {
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
  export const stringReverse = async (arr: Array<symbolProps>) => {
    let step = 0
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      swap(arr, start, end);
      end--;
      step++
    }
    return { 
      resultArr: arr, 
      countSteps: step
    }
  }
