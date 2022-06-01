import { TStatusObject } from "../../../types/statusObject";


export const focusingCurrentElements = (arr: any, currentIndex: number, status: string) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = TStatusObject.Default;
}

export const checkSortedElement = (arr: any, index: number) => {
    arr[arr.length-1-index].state = TStatusObject.Modified;
   
}
//Фокусируем модифицированный элемент
export const focusingModifiedElement = (arr: any, currentInd: number) => {
    arr[currentInd].state =TStatusObject.Modified;
}

//Фокусируем выделенный элемент

export const focusingInitElement = (arr: any, currentInd: number) => {
    arr[currentInd].state =TStatusObject.Chosen;
}

//Фокусируем текущий элемент

export const focusingCheckedElement = (arr: any, currentInd: number) => {
    arr[currentInd].state =TStatusObject.Changing;
}

//Фокусируем мин/макс элемент

export const focusingMinMaxElement = (arr: any , currentInd: number, swapInd: number) => {
    currentInd === swapInd 
    ? arr[currentInd].state =TStatusObject.Chosen
    : arr[currentInd].state =TStatusObject.Default
    
}

