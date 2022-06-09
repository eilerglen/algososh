import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { Button } from "../../ui/button/button";
import { RadioButton } from "../../ui/radio-button/radio-button";
import { swap, pause } from "../../utils/utils";
import stylesSortingPage from "./sorting.page.module.css";
import { Column } from "../../ui/column/column";
import { TStatusObject } from "../../types/statusObject";
import { Direction } from "../../types/direction";
import { generateRandomArr } from "../../utils/generateRandomArr";
import { bubbleSort } from "./utils/bubbleSort";
import { selectionSort } from "./utils/selectionSort";
import { columnObject } from "../../types/columns";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<columnObject>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const generateArr = () => {
    setInitialArr([...generateRandomArr()]);
  };

  useEffect(() => {
    generateArr();
  }, []);


  const startSort = async (direction: any, sortType: string) => {
    //Сброс уже отсортированного массива.
    if (initialArr[0].state === 'modified') {
      setInitialArr(initialArr.map((item: columnObject) => {
        item.state = TStatusObject.Default;
        return item
      }))
    }
    //Блокирование кнопок.
    setInProgress(true);
    //Сортировка выбором.
    if (sortType === "selection") await selectionSort(direction, setInitialArr, initialArr);
    //Сортировка пузырьком.
    else {
      await bubbleSort(direction, setInitialArr, initialArr)
    }
    //Разблокирование кнопок.
    setInProgress(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${stylesSortingPage["flex-container"]}`}>
        <RadioButton
          label="Выбор"
          mixin={stylesSortingPage.radio}
          onChange={() => setSortType("selection")}
          value="selection"
          checked={sortType === "selection"}
          
        />
        <RadioButton
          label="Пузырёк"
          mixin={stylesSortingPage.radio}
          checked={sortType === "bubble"}
          onChange={() => setSortType("bubble")}
          value="bubble"
        />
        <Button
          text="По возрастанию"
          sorting={Direction.Ascending}
          mixin={stylesSortingPage.button}
          type="submit"
          onClick={() => startSort('ascending', sortType)
          }
          disabled={inProgress}
        />
        <Button
          text="По убыванию"
          sorting={Direction.Descending}
          mixin={stylesSortingPage.button}
          type="submit"
          onClick={() => startSort('descending', sortType)
          }
          disabled={inProgress}
        />
        <Button
          text="Новый массив"
          mixin={stylesSortingPage.button}
          onClick={generateArr}
          isLoader={inProgress}
        />
      </div>
      <div className={`${stylesSortingPage["flex-container-list"]}`}>
        <ul className={stylesSortingPage.list}>
          {initialArr &&
            initialArr.map((item, index: number) => (
              <li key={index} className={`${stylesSortingPage["list-elem"]}`}>
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
