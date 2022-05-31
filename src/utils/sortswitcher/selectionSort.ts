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
  const arr = [...initialArr];
  setInitialArr([...arr]);
  // Начинаем цикл
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    let swapInd = i;
    arr[i].state = TStatusObject.Chosen;
    overWriteArr(arr,  setInitialArr);
    await pause(1000)
    for (let j = i + 1; j < length; j++) {
      arr[j].state = TStatusObject.Changing;
      overWriteArr(arr,  setInitialArr);
      await pause(1000)
      if (
        (mode === "ascending" ? arr[swapInd].num : arr[j].num) > (mode === "ascending" ? arr[j].num : arr[swapInd].num)
      ) {
        arr[j].state =  TStatusObject.Chosen; //если у нас i-ый элемент(swapInd) больше j то делаем j-ый элемент желтым
        arr[swapInd].state =
          i === swapInd ?  TStatusObject.Chosen : TStatusObject.Default; //задаем цвет столбика по такому правилу если у нас index i равен (swapInd) делаем его желтым цветом ,остальное дефолтным
        swapInd = j; //начинаем переопределять индекс наименьшего элемента. Двигаем его вправо, если есть эелементы меньше до самого минимального
        overWriteArr(arr, setInitialArr);
        await pause(1000)
      }
      arr[j].state =
        swapInd === j ? TStatusObject.Chosen :  TStatusObject.Default;
    }

    if (i === swapInd) {
      //Если у нас i-ый элемент оказался минимальным, то соотвествующий столбик красим в зеленый
      arr[i].state =  TStatusObject.Modified;
      overWriteArr(arr, setInitialArr);
      await pause(1000)
    }
   
    else {
       //Если же нет, то
      swap(arr, i, swapInd); //меняем i-ый элемент местами с минимальным
      await overWriteArr(arr, setInitialArr);
      arr[i].state =  TStatusObject.Modified; //i-ый элемент: соотвествующий столбик красим в зеленый
      arr[swapInd].state = TStatusObject.Default; 
    }
  }

};


