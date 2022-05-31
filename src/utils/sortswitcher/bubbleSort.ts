import React from "react";
import { swap, pause } from "../utils";
import { columnObject } from "../../types/columns";
import { TStatusObject } from "../../types/statusObject";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import {
  focusingCurrentElements,
  checkSortedElement,
} from "../../utils/modificateStatus";
// import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const overWriteArr = async (
  arr: columnObject[],
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>
) => {
  setInitialArr([...arr]);
};

export const bubbleSort = async (
  mode: "ascending" | "descending",
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>,
  initialArr: columnObject[]
) => {
  // Лочим кнопки

  //   mode === "ascending" ? setAscendingRunning(true) : setDescendingRunning(true);
  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...initialArr];
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      // детектим сравниваемые элементы
      focusingCurrentElements(arr, j, TStatusObject.Changing);
      overWriteArr(arr, setInitialArr);
      await pause( SHORT_PAUSE);
      // Если один больше (меньше) другого - свапаем их
      if (
        (mode === "ascending" ? arr[j].num : arr[j + 1].num) >
        (mode === "ascending" ? arr[j + 1].num : arr[j].num)
      ) {
        overWriteArr(arr, setInitialArr);
        swap(arr, j, j + 1);
      }
      arr[j].state = TStatusObject.Default;
      arr[j + 1].state = TStatusObject.Default;
    }
    checkSortedElement(arr, i);
    
  }
  // Начинаем цикл

  // Массив отсортирован
  arr.forEach((item) => (item.state = TStatusObject.Modified));
  setInitialArr([...arr]);
  // Анлочим кнопки

  //   mode === "ascending"
  //     ? setAscendingRunning(false)
  //     : setDescendingRunning(false);
};
