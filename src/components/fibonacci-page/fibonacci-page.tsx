import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
// import { awaitingChanges } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";

import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputNum, setInputNum] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isNumCorrect, setIsNumCorrect] = useState<boolean>(false);
  const [fiboNums, setFiboNums] = useState<Array<number>>([]);

  //Активация кнопки калькуляции при изменении поля ввода.
  useEffect(() => {
    (inputNum > 0 && inputNum < 20) ? setIsNumCorrect(true) : setIsNumCorrect(false);
  }, [inputNum]);
  
  //Фибоначчи.
  const fiboCalc = (num: number, memo: Record<number, number> = {}): number => {
    if (num in memo) {
      return memo[num];
    }  
    if (num <= 2) {
      return 1
    }
    memo[num] = fiboCalc(num - 1, memo) + fiboCalc(num - 2, memo);
    return memo[num];
  }

  //Нажатие кнопки Рассчитать.
  const handleClickToShow = async () => {
    setInProgress(true);
    let nums = [];
    for (let i = 1; i <= inputNum + 1; i++) {
      // await awaitingChanges(SHORT_DELAY_IN_MS)
      nums.push(fiboCalc(i))
      setFiboNums([...nums]);
    }
    setInProgress(false);
  }

  //Рендер каждого числа.
  const renderNum = (num: number, ind: number) => {
    return (
      <li className={`${styles['list-elem']}`} key={ind}>
        <Circle
          letter={`${num}`}
        />
        <p>{ind}</p>
      </li>
    )
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles['flex-container']}`}>

        <Input
          extraClass={styles.input}
          isLimitText={true}
          max={19}
          type={"number"}
          onChange={(e: any) => setInputNum(+e.target.value)}
        />

        <Button
          text={'Рассчитать'}
          onClick={handleClickToShow}
          disabled={!isNumCorrect}
          isLoader={inProgress} />

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {fiboNums && fiboNums.map((el, ind) =>
            renderNum(el, ind)
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};