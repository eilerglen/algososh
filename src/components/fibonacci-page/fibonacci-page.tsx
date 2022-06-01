import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import React, { useEffect, useState } from "react";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { pause } from "../../utils/utils";
import { Button } from "../../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { fibbonachi } from "./utils";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputNum, setInputNum] = useState<number>(0);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isNumCorrect, setIsNumCorrect] = useState<boolean>(false);
  const [initArr, setInitArr] = useState<Array<number>>([]);

  //Активация кнопки калькуляции при изменении поля ввода.
  useEffect(() => {
    (inputNum > 0 && inputNum < 20) ? setIsNumCorrect(true) : setIsNumCorrect(false);
  }, [inputNum]);
  

  //Нажатие кнопки Рассчитать.
  const handleStartAnimation = async () => {
    setInProgress(true);
    let nums = [];
    for (let i = 1; i <= inputNum + 1; i++) {
      await pause(SHORT_PAUSE)
      nums.push(fibbonachi(i))
      setInitArr([...nums]);
    }
    setInProgress(false);
  }

  //Рендер каждого числа.
  const renderNumber = (num: number, ind: number) => {
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
          onClick={handleStartAnimation}
          disabled={!isNumCorrect}
          isLoader={inProgress} />

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {initArr && initArr.map((item, ind) =>
             renderNumber(item, ind)
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};