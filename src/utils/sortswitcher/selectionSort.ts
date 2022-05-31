import React from "react";
import { swap, pause } from "../utils";
import { columnObject } from "../../types/columns";
import { TStatusObject } from "../../types/statusObject";
import { LONG_PAUSE } from "../../constants/pauseLimits";
import {
  
  forChangingStateChoice,
  changeStateAfterLoopChoice,
} from "../../utils/modificateStatus";
// import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const overWriteArr = async (
  arr: columnObject[],
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>
) => {
  setInitialArr([...arr]);
};

export const selectionSort = async (
  mode: "ascending" | "descending",
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>,
  initialArr: columnObject[]
) => {
  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...initialArr];
  arr.forEach((el) => (el.state = TStatusObject.Default));
  setInitialArr([...arr]);
  // Начинаем цикл
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    // Инициализация счётчика
    let swapInd = i;
    // Подсвечиваем элемент рыжим, который будет отсортирован
    arr[i].state = TStatusObject.Chosen;
    overWriteArr(arr,  setInitialArr);
    await pause(1000)
    // Начинаем цикл по оставшимся элементам
    for (let j = i + 1; j < length; j++) {
      // Подсвечиваем кандидата на свап фиолетовым
      arr[j].state = TStatusObject.Changing;
      overWriteArr(arr,  setInitialArr);
      await pause(1000)
      if (
        (mode === "ascending" ? arr[swapInd].num : arr[j].num) >
        (mode === "ascending" ? arr[j].num : arr[swapInd].num)
      ) {
        // Если кандидат больше (меньше) текущего экстремума - то мы нашли второй элемент на свап,
        // подсвечиваем его рыжим, а старого кандидата либо делаем дефолтным,
        // либо оставляем рыжим (если это i-й элемент, для которого мы ищем кандидата)
        arr[j].state =  TStatusObject.Chosen;
        arr[swapInd].state =
          i === swapInd ?  TStatusObject.Chosen : TStatusObject.Default;
        swapInd = j;
        overWriteArr(arr, setInitialArr);
        await pause(1000)
      }
      // После визуальной сортировки меняем цвет текущего элемента, но не
      // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
      arr[j].state =
        swapInd === j ? TStatusObject.Chosen :  TStatusObject.Default;
    }
    // Если сортируемый элемент сам является экстремумом - рисуем его как "modified"
    if (i === swapInd) {
      arr[i].state =  TStatusObject.Modified;
      overWriteArr(arr, setInitialArr);
      await pause(1000)
    }
   
    else {
      swap(arr, i, swapInd);
      await overWriteArr(arr, setInitialArr);
      arr[i].state =  TStatusObject.Modified;
      arr[swapInd].state = TStatusObject.Default;
      await overWriteArr(arr,  setInitialArr);
    }
  }

};
