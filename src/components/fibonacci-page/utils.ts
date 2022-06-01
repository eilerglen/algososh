  //Функция Фиббоначи
  export const fibbonachi = (num: number, memo: Record<number, number> = {}): number => {
    if (num in memo) {
      return memo[num];
    }  
    if (num <= 2) {
      return 1
    }
    memo[num] = fibbonachi(num - 1, memo) + fibbonachi(num - 2, memo);
    return memo[num];
  }
