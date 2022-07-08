import React, { useState } from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { Input } from "../../ui/input/input";
import { Button } from "../../ui/button/button";
import { Circle } from "../../ui/circle/circle";
import { TStatusObject } from "../../types/enums/statusObject";
import { swap, pause } from "../../utils/utils";
import styles from "./string.module.css";
import { SHORT_PAUSE } from "../../constants/constants";
import { ISymbolProps } from "./utils";
import { stringReverseAlgo } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [charArr, setCharArr] = useState<Array<ISymbolProps>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

    //Рендер вводимых символов.
    const renderInputNumbers = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const targetInput = evt.currentTarget
      setInputValue(targetInput.value)
      setCharArr(
        targetInput.value.split("").map((symbol: string) => {
          return {
            symbol: symbol,
            state: TStatusObject.Default,
          };
        })
      );
    };


  // Главная функция

  const stringReverse = async () => {
    let count = 0
    setInProgress(true);
    const temp = [...charArr]
    const stepCounter = stringReverseAlgo(inputValue)
    while(count <= stepCounter) {
      
      temp[count].state = TStatusObject.Changing;
      temp[inputValue.length - (count+1)].state = TStatusObject.Changing;
      setCharArr([...temp]);
      await pause( SHORT_PAUSE);
      swap(temp, count, temp.length-(count+1) )
      
      temp[count].state = TStatusObject.Modified;
      temp[inputValue.length - (count+1)].state = TStatusObject.Modified;
      setCharArr([...temp]);
      await pause( SHORT_PAUSE );
      count++

    }

    setInProgress(false);
  };

  

  //Запуск главной функции перестановки по нажатию кнопки.
  const handleStartAnimation = async () => {
    //Вернуть в дефолтное состояние, если строка уже отсортирована.
    if (charArr[0].state === "modified") {
      setCharArr(
        charArr.map((symbol: ISymbolProps) => {
          symbol.state = TStatusObject.Default;
          return symbol;
        })
      );
    }
    stringReverse();
  };


  return (
    <SolutionLayout title="Строка">
      <div className={`${styles["flex-container"]}`}>
        <Input
          value={inputValue}
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          onChange={renderInputNumbers}
        />

        <Button
          disabled={!inputValue}
          text={"Развернуть"}
          isLoader={inProgress}
          type="submit"
          onClick={handleStartAnimation}
        />
      </div>
      <div className={`${styles["flex-container"]}`}>
        <ul className={styles.list}>
          {charArr &&
            charArr.map((el: ISymbolProps, ind) => (
              <li className={`${styles["list-elem"]}`} key={ind}>
                <Circle letter={el.symbol} state={el.state} />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
