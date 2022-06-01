import React from "react";
import { swap, pause } from "../../../utils/utils";
import { columnObject } from "../../../types/columns";
import { TStatusObject } from "../../../types/statusObject";
import { LONG_PAUSE } from "../../../constants/pauseLimits";
import {
  focusingCheckedElement,
  focusingInitElement,
  focusingModifiedElement,
  focusingMinMaxElement,
} from "./modificateStatus";


export const selectionSort = async (
  option: "ascending" | "descending",
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>,
  initialArr: columnObject[]
) => {
  const arr = [...initialArr];
  setInitialArr([...arr]);
  const { length } = arr;

  //Начинаем внешний цикл

  for (let i = 0; i < length; i++) {
    let swapInd = i;
    focusingInitElement(arr, i)
    setInitialArr([...arr])
    // overWriteArr(arr,  setInitialArr);
    await pause(LONG_PAUSE)

    //Начинаем внутренний цикл

    for (let j = i + 1; j < length; j++) {
      focusingCheckedElement(arr, j)
      setInitialArr([...arr])
      // overWriteArr(arr,  setInitialArr);
      await pause(LONG_PAUSE)
      if (
        ( option === "ascending" ? arr[swapInd].num : arr[j].num) > ( option === "ascending" ? arr[j].num : arr[swapInd].num)
      ) {
        arr[j].state =  TStatusObject.Chosen; //если у нас i-ый элемент(swapInd) больше j то делаем j-ый элемент желтым
        arr[swapInd].state =
          i === swapInd ?  TStatusObject.Chosen : TStatusObject.Default; //задаем цвет столбика по такому правилу если у нас index i равен (swapInd) делаем его желтым цветом ,остальное дефолтным
        swapInd = j; //начинаем переопределять индекс наименьшего элемента. Двигаем его вправо, если есть эелементы меньше до самого минимального
        setInitialArr([...arr])
        // overWriteArr(arr, setInitialArr);
        await pause(LONG_PAUSE)
      }
      focusingMinMaxElement(arr, j, swapInd)
      // arr[j].state =
      //   swapInd === j ? TStatusObject.Chosen :  TStatusObject.Default;
    }

    if (i === swapInd) {
      //Если у нас i-ый элемент оказался минимальным, то соотвествующий столбик красим в зеленый
      //То есть нчиего местами менять не нужно
      focusingModifiedElement(arr, i) 
      setInitialArr([...arr])
      // overWriteArr(arr, setInitialArr);
      await pause(LONG_PAUSE)
    }
   
    else {
       //Если же нет, то
      swap(arr, i, swapInd); //меняем i-ый элемент местами с минимальным (здесь как раз главный обмен и происходит!)
      setInitialArr([...arr])
      focusingModifiedElement(arr, i) //i-ый элемент: соотвествующий столбик красим в зеленый
      arr[swapInd].state = TStatusObject.Default; 
    }
  }

};

