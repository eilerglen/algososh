import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TStatusObject} from "../../types/statusObject";
import { swap, pause } from "../../utils/utils";
import styles from "./string.module.css";
import {  SHORT_PAUSE } from "../../constants/pauseLimits";
import { ISymbolProps } from "./utils";
import {changeState} from './utils'

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState(""); 
   const [charArr, setCharArr] = useState<Array<ISymbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  // Меняем статус кружка с паузой

  const changeStateRender = async (arr: Array<ISymbolProps>, status: string, startIndex: number, endIndex: number) => {
    changeState(arr, status, startIndex, endIndex );
    setCharArr([...arr])
    await pause(SHORT_PAUSE)
  }

  // Главная функция
  
  const stringReverse = async (arr: Array<ISymbolProps>) => {
    setInProgress(true);
    let end = arr.length - 1;
    for (let start = 0; start <= end; start++) {
      if (start === end) {
        await changeStateRender(arr, "changing", start, end)
        changeState(arr, "modified", start);
        setCharArr([...arr])
      }
      await changeStateRender(arr, "changing", start, end)
      swap(arr, start, end);
      await changeStateRender(arr, "modified", start, end)
      end--;
    }
    setInProgress(false);
  }

  //Рендер вводимых символов.
  const renderInputNumbers = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCharArr(evt.target.value.split('').map((symbol: string) => {
      return {
        symbol: symbol,
        state: TStatusObject.Default
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
          {charArr && charArr.map((el: ISymbolProps, ind) =>
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