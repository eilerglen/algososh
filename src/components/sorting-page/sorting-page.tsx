import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../../ui/button/button"
import { RadioButton } from "../../ui/radio-button/radio-button";
import stylesSortingPage from "./sorting.page.module.css";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<string>("choice");

  const onTab = () => {
    console.log(12);
  };



  const randomArr = () => {
    let nums = [];
    const countNums = Math.floor(Math.random() * 14 + 3);
    for (let i = 0; i < countNums; i++) {
    nums.push({
        num: Math.floor(Math.random() * 101),
        state: "default"
      });
    }
    // setNumsSorting([...nums]);
  }


  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${stylesSortingPage["flex-container"]}`}>
        <RadioButton
          label="Выбор"
          name="sortingType"
          value="choice"
          onClick={onTab}
          mixin={stylesSortingPage.radio}
        />
        <RadioButton
          label="Пузырек"
          name="sortingType"
          value="choice"
          onClick={onTab}
          mixin={stylesSortingPage.radio}
        />

        <Button
          text="По возрастанию"
          sorting={'ascending'}
          extraClass={stylesSortingPage.button}
          // onClick={() => handleClickSorting("ascending", typeSort)}
          // disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="По убыванию"
          sorting={'descending'}
          extraClass={stylesSortingPage.button}
          // onClick={() => handleClickSorting("descending", typeSort)}
          // disabled={inProgress || numsSorting.length === 0}
        />
        <Button
          text="Новый массив"
          extraClass={stylesSortingPage.button}
          onClick={randomArr}
          // isLoader={inProgress}
        />
      </div>
    </SolutionLayout>
  );
};
