import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { swap, pause } from "../../utils/utils";
import stylesSortingPage from "./sorting.page.module.css";
import { Column } from "../../ui/column/column";
import { TStatusObject } from "../../ui/column/column";
import { TDirection } from "../../types/direction";

export interface numsProps {
  num: number;
  state: TStatusObject;
}

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<any>>([]);

  const randomArr = () => {
    let initArr = [];
    const count = Math.floor(Math.random() * 14 + 3);
    for (let i = 0; i < count; i++) {
      initArr.push({
        num: Math.floor(Math.random() * 101),
        state: "default",
      });
    }
    setInitialArr([...initArr]);
  };

  const handleClickSorting = (direction: string, typeSort: string) => {
    //Сброс уже отсортированного массива.
    if (typeSort === "selection") choiceSorting(direction, initialArr);
    else bubbleSorting(direction, initialArr);
  };

  //Сортировка пузырьком.
  const bubbleSorting = async (direction: string, arr: Array<any>) => {
    //Блокирование кнопок.

    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        //Смена статусов активных столбцов.

        if (direction === "ascending") {
          if (arr[j].num > arr[j + 1].num) {
            //Смена статусов столбцов подлежащих перестановке.

            swap(arr, j, j + 1);
          }
        } else {
          if (arr[j].num < arr[j + 1].num) {
            //Смена статусов столбцов подлежащих перестановке.

            swap(arr, j, j + 1);
          }
        }
      }
    }
    //Разблокирование кнопок.
  };

  //Сортировка выбором.
  const choiceSorting = async (direction: string, arr: Array<any>) => {
    //Блокирование кнопок.

    const end = arr.length;

    for (let i = 0; i < end; i++) {
      //Установка как первого элемента как максимального/минимального.
      let operationInd = i;
      let operationColumn = arr[i].num;
      //Изменение статуса первого элемента на changing.

      for (let j = i + 1; j < end; j++) {
        //Изменить статус активного столбца и вернуть предыдущий в default/changing.

        //Выбор направления сортировки.
        if (direction === "ascending") {
          if (arr[j].num < operationColumn) {
            let previous = operationInd;
            operationInd = j;
            operationColumn = arr[j].num;
          }
        } else if (direction === "descending") {
          if (arr[j].num > operationColumn) {
            let previous = operationInd;
            operationInd = j;
            operationColumn = arr[j].num;
          }
        }
      }
      //Перестановка столбцов, если был найден новый.
      if (i !== operationInd) {
        swap(arr, i, operationInd);
      }
      //Сброс статусов на default, кроме первого столбца, он становится модифицированным.
    }
    //Разблокирование кнопок.
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${stylesSortingPage["flex-container"]}`}>
        <RadioInput
          label="Выбор"
          mixin={stylesSortingPage.radio}
          onChange={() => setSortType("selection")}
          value="selection"
          checked={sortType === "selection"}
        />
        <RadioInput
          label="Пузырёк"
          mixin={stylesSortingPage.radio}
          checked={sortType === "bubble"}
          onChange={() => setSortType("bubble")}
          value="bubble"
        />
        <Button
          text="По возрастанию"
          sorting={"ascending"}
          extraClass={stylesSortingPage.button}
          onClick={() => handleClickSorting("ascending", sortType)}
          // disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={"descending"}
          extraClass={stylesSortingPage.button}
          onClick={() => handleClickSorting("descending", sortType)}
          // disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="Новый массив"
          extraClass={stylesSortingPage.button}
          onClick={randomArr}
          // isLoader={inProgress}
        />
      </div>
      <div className={`${stylesSortingPage["flex-container-list"]}`}>
        <ul className={stylesSortingPage.list}>
          {initialArr &&
            initialArr.map((item: numsProps, ind: number) => (
              <li key={ind} className={`${stylesSortingPage["list-elem"]}`}>
                <Column
                  index={item.num}
                  state={item.state}
                  mixin={stylesSortingPage.column}
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
