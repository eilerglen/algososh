import { columnObject } from "../types/columns";
export const swap = (arr: Array<any>, left: number, right: number ) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp
}

export const pause = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}