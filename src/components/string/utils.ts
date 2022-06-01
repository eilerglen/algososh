  //Изменить статус/внешний вид символов.
  export const changeState = (arr: any, status: string, start: number, end?: number) => {
    arr[start].state = status;
    if (end) {
      arr[end].state = status;
    }
  }
