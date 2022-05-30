
export const swap = (arr: Array<String | number>, left: number, right: number ) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp
}

export const pause = async () => {
    return new Promise(resolve => setTimeout(resolve))
}