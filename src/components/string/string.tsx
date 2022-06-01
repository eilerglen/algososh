import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TStatusObject} from "../../types/statusObject";
import { swap, pause } from "../../utils/utils";
import styles from "./string.module.css";
import {  SHORT_PAUSE } from "../../constants/pauseLimits";
import {changeState, stringReverse} from './utils'

interface symbolProps {
  symbol: string;
  state:TStatusObject;
}

export const StringComponent: React.FC = () => {
  const [charArr, setCharArr] = useState<Array<symbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const stringReverse = async (arr: Array<symbolProps>) => {
    setInProgress(true);
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      if (start === end) {
        changeState(arr, "changing", start);
        setCharArr([...arr])
        await pause( SHORT_PAUSE )
        changeState(arr, "modified", start);
        setCharArr([...arr])
      }
      changeState(arr, "changing", start, end);
      setCharArr([...arr])
      await pause( SHORT_PAUSE )
      swap(arr, start, end);
      changeState(arr, "modified", start, end);
      setCharArr([...arr])
      await  pause( SHORT_PAUSE )
      end--;
    }
    setInProgress(false);
  }

  //Рендер вводимых символов.
  const renderInputNumbers = (event: any) => {
    setCharArr(event.target.value.split('').map((symbol: any) => {
      return {
        symbol: symbol,
        state: "default",
      }
    }))
  }

  //Запуск функции перестановки по нажатию кнопки.
  const handleStartAnimation = async () => {
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArr[0].state === 'modified') {
      setCharArr(charArr.map((symbol: any) => {
        symbol.state = "default";
        return symbol
      }))
    }
    stringReverse(charArr);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles['flex-container']}`}>

        <Input
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          // formOfWord={"символов"}
          onChange={renderInputNumbers}
        />

        <Button text={'Развернуть'} onClick={handleStartAnimation} isLoader={inProgress}></Button>

      </div>
      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {charArr && charArr.map((el: symbolProps, ind) =>
            <li className={`${styles['list-elem']}` } key={ind}>
              <Circle
                letter={el.symbol}
                state={el.state}
              />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};