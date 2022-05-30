import { columnObject } from "../types/columns";
export const swap = (arr: Array<columnObject>, left: number, right: number ) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp
}

export const pause = async () => {
    return new Promise(resolve => setTimeout(resolve))
}