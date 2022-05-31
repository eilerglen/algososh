import { TStatusObject } from "../types/statusObject";

//Сортировка пузырьком.
//Активный статус проверяемого элемента и возвращени предыдущему неподходящему default для сортировки пузырьком.
export const focusingCurrentElements = (arr: any, currentIndex: number, status: string) => {
    arr[currentIndex].state = status;
    arr[currentIndex + 1].state = status;
    if (arr[currentIndex - 1]) arr[currentIndex - 1].state = TStatusObject.Default;
}

//Сброс статусов после окончания цикла сортировки пузырьком.
export const checkSortedElement = (arr: any, index: number) => {
    arr[arr.length-1-index].state = TStatusObject.Modified;
   
}

export const checkSortedAllElements= (arr: any, index: number) => {
    arr[index].state = TStatusObject.Modified;
   
}

//Сортировка выбором.

//Активный статус проверяемого элемента и возвращени предыдущему неподходящему default для сортировки выбором.
export const focusingInitElement = (arr: any, currentInd: number) => {
    arr[currentInd].state =TStatusObject.Chosen;
}

export const ocusingCheckedElement = (arr: any, currentInd: number) => {
    arr[currentInd].state =TStatusObject.Changing;
}


//Изменение статусов после каждого цикла Выбором. Первыйс-модифицированный, остальные в default.
export const changeStateAfterLoopChoice = (arr: any, start: number, ) => {
    for (let i = start; i < arr.length; i++) {
        if (i === start) arr[i].state = TStatusObject.Modified;
        else arr[i].state = TStatusObject.Default;
    }
}

//Смена статусов changing для сортировки выбором.
export const forChangingStateChoice = (arr: any, forChange: number, previous?: number, start?: number) => {
    //Изменяем статус на changing наименьшего на настоящий момент элемента.
    arr[forChange].state = TStatusObject.Changing;

    //Возвращаем статус default предыдущему элементу, если найден новый по условию и проверка, 
    //чтобы это была не первая колонка.
    if (previous && start?.toString() && previous !== start) arr[previous].state =TStatusObject.Default;

}
