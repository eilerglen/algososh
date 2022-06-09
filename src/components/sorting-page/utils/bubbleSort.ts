import React from "react";
import { swap, pause } from "../../../utils/utils";
import { columnObject } from "../../../types/columns";
import { TStatusObject } from "../../../types/statusObject";
import { SHORT_PAUSE } from "../../../constants/pauseLimits";
import {
  focusingCurrentElements,
  checkSortedElement,
} from "./modificateStatus";
import { Direction } from "../../../types/direction";

export const bubbleSort = async (
  option: Direction.Ascending | Direction.Descending,
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>,
  initialArr: columnObject[]
) => {
  //   mode === "ascending" ? setAscendingRunning(true) : setDescendingRunning(true);
  const arr = [...initialArr];
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      // детектим сравниваемые элементы
      focusingCurrentElements(arr, j, TStatusObject.Changing);
      setInitialArr([...arr])
      await pause( SHORT_PAUSE);
      // Если один больше (меньше) другого - свапаем их
      if (
        (option === Direction.Ascending ? arr[j].num : arr[j + 1].num) >
        (option === Direction.Ascending ? arr[j + 1].num : arr[j].num)
      ) {
        setInitialArr([...arr])
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

  //   mode === "ascending"
  //     ? setAscendingRunning(false)
  //     : setDescendingRunning(false);
};
