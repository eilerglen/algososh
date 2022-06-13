import { TStatusObject } from "../../../types/enums/statusObject";
import { columnObject } from "../../../types/columns";

export const focusingCurrentElements = (arr: columnObject[], currentIndex: number, status: TStatusObject) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = TStatusObject.Default;
}

export const checkSortedElement = (arr: columnObject[], index: number) => {
    arr[arr.length-1-index].state = TStatusObject.Modified;
   
}
//Фокусируем модифицированный элемент
export const focusingModifiedElement = (arr: columnObject[], currentInd: number) => {
    arr[currentInd].state =TStatusObject.Modified;
}

//Фокусируем выделенный элемент

export const focusingInitElement = (arr: columnObject[], currentInd: number) => {
    arr[currentInd].state =TStatusObject.Chosen;
}

//Фокусируем текущий элемент

export const focusingCheckedElement = (arr: columnObject[], currentInd: number) => {
    arr[currentInd].state =TStatusObject.Changing;
}

//Фокусируем мин/макс элемент

export const focusingMinMaxElement = (arr: columnObject[], currentInd: number, swapInd: number) => {
    currentInd === swapInd 
    ? arr[currentInd].state =TStatusObject.Chosen
    : arr[currentInd].state =TStatusObject.Default
    
}

