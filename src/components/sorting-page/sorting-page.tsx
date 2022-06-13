import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { Button } from "../../ui/button/button";
import { RadioButton } from "../../ui/radio-button/radio-button";
import { pause } from "../../utils/utils";
import stylesSortingPage from "./sorting.page.module.css";
import { Column } from "../../ui/column/column";
import { TStatusObject } from "../../types/enums/statusObject";
import { Direction } from "../../types/enums/direction";
import { generateRandomArr } from "../../utils/generateRandomArr";
import { bubbleSortAlgo } from "./utils/bubbleSort";
import { selectionSortAlgo } from "./utils/selectionSort";
import { columnObject } from "../../types/columns";
import { SHORT_PAUSE } from "../../constants/constants";

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
    let stepCounter = 1
    //Сброс уже отсортированного массива.
    if (initialArr[0].state === 'modified') {
      setInitialArr(initialArr.map((item: columnObject) => {
        item.state = TStatusObject.Default;
        return item
      }))
      stepCounter = 1
    }
    //Блокирование кнопок.
    setInProgress(true);
    const tempArr = [...initialArr]
    if (sortType === "selection") {
      while (stepCounter !== selectionSortAlgo(direction, tempArr).countSteps) {
        setInitialArr(selectionSortAlgo(direction, tempArr, stepCounter).resultArray)
        await pause(SHORT_PAUSE)
        stepCounter++;
      }
    }
    //Сортировка пузырьком.
    else {
      while (stepCounter <= bubbleSortAlgo(direction, tempArr).countSteps) {
        setInitialArr(bubbleSortAlgo (direction, tempArr, stepCounter).resultArray)
        await pause(SHORT_PAUSE)
        stepCounter++;
      }

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
