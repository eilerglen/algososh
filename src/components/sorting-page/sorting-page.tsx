import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../../ui/button/button";
import { RadioButton } from "../../ui/radio-button/radio-button";
import { swap, pause } from "../../utils/utils";
import stylesSortingPage from "./sorting.page.module.css";
import { Column } from "../../ui/column/column";
import { TStatusObject } from "../../types/statusObject";
import { TDirection } from "../../types/direction";
import { generateRandomArr } from "../../utils/generateRandomArr";
import { bubbleSort } from "../../utils/sortswitcher/bubbleSort";
import { selectionSort } from "../../utils/sortswitcher/selectionSort";
import { columnObject } from "../../types/columns";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<string>("selection");
  const [initialArr, setInitialArr] = useState<Array<columnObject>>([]);

  const generateArr = () => {
    setInitialArr([...generateRandomArr()]);
  };

  useEffect(() => {
    generateArr();
  }, []);

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
          sorting={"ascending"}
          mixin={stylesSortingPage.button}
          type="submit"
          onClick={() =>
            sortType === "bubble"
              ? bubbleSort("ascending", setInitialArr, initialArr)
              : selectionSort("ascending", setInitialArr, initialArr)
          }
        />
        <Button
          text="По убыванию"
          sorting={"descending"}
          mixin={stylesSortingPage.button}
          type="submit"
          onClick={() =>
            sortType === "bubble"
              ? bubbleSort("descending", setInitialArr, initialArr)
              : selectionSort("descending", setInitialArr, initialArr)
          }
        />
        <Button
          text="Новый массив"
          mixin={stylesSortingPage.button}
          onClick={generateArr}
          // isLoader={inProgress}
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
