import React from "react";
import { swap } from "../utils";
import { columnObject } from "../../types/columns";
import { TStatusObject } from "../../types/statusObject";
// import { SHORT_DELAY_IN_MS } from "../../constants/delays";


const overWriteArr = (
  arr: columnObject[],
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>
) => {
  setInitialArr([...arr]);
  // await delay(SHORT_DELAY_IN_MS);
};


export const bubbleSort = (
  mode: "ascending" | "descending",
  setInitialArr: React.Dispatch<React.SetStateAction<columnObject[]>>,
  initialArr: columnObject[]
) => {
  // Лочим кнопки

  //   mode === "ascending" ? setAscendingRunning(true) : setDescendingRunning(true);
  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...initialArr];
  arr.forEach((item) => (item.state = TStatusObject.Default));

  overWriteArr(arr, setInitialArr);
  // Начинаем цикл
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    // Подсвечиваем выбранные элементы
    arr[i].state = TStatusObject.Changing;
    arr[i + 1].state = TStatusObject.Changing;
    overWriteArr(arr, setInitialArr);
    // Если один больше (меньше) другого - свапаем их
    if (
      (mode === "ascending" ? arr[i].num : arr[i + 1].num) >
      (mode === "ascending" ? arr[i + 1].num : arr[i].num)
    ) {
      arr[i].state = TStatusObject.Chosen;
      arr[i + 1].state = TStatusObject.Chosen;
      overWriteArr(arr, setInitialArr);
      swap(arr, i, i + 1);
      arr[i].state = TStatusObject.Chosen;
      arr[i + 1].state = TStatusObject.Chosen;
      overWriteArr(arr, setInitialArr);
    }
    // После визуальной сортировки меняем цвет текущего элемента, но не
    // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
    arr[i].state = TStatusObject.Default;
    arr[i + 1].state =TStatusObject.Default;
  }

  // Массив отсортирован
  arr.forEach((item) => (item.state = TStatusObject.Default));
  setInitialArr([...arr]);
  // Анлочим кнопки

  //   mode === "ascending"
  //     ? setAscendingRunning(false)
  //     : setDescendingRunning(false);
};
