import React, { useState } from "react";
import { Button } from "../../ui/button/button";
import { Input } from "../ui/input/input";
import { Stack } from "./utils";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stackValues, setStackValues] = useState<Array<any>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll("input")[0].value = "";
  };

  //Очистить все данные.
  const resetStack = (arrValues: Array<any>) => {
    arrValues.length = 0;
    setStackValues([...arrValues]);
  };

  const handleResetStack = () => {
    resetStack(stackValues);
  };

  const handlePush = async () => {
    setInputValue("");
    resetInput();
    await pause(SHORT_PAUSE);
    stackValues[stackValues.length - 1].state = TStatusObject.Default;
    setStackValues([...stackValues]);
  };

  const handlePop = async () => {
    setStackValues([...stackValues]);
    await pause(SHORT_PAUSE);
    stackValues[stackValues.length - 1].state = TStatusObject.Changing;
    stackValues[stackValues.length - 1].head = "top";
    setStackValues([...stackValues]);
  };
  //Создаем инстанс
  const stack = new Stack(
    handlePush,
    handlePop,
    setInputValue,
    setStackValues,
    stackValues,
    inputValue
  );

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles["flex-container"]}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText={true}
          onChange={(e: any) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          text={"Добавить"}
          mixin={styles.button}
          disabled={inputValue.length === 0 || inProgress}
          onClick={() => stack.push()}
        />
        <Button
          text={"Удалить"}
          mixin={styles.button}
          onClick={() => stack.pop()}
          disabled={stackValues.length === 0 || inProgress}
        />
        <Button
          text={"Очистить"}
          mixin={styles.button}
          disabled={stackValues.length === 0 || inProgress}
          onClick={handleResetStack}
        />
      </div>
      <div className={`${styles["flex-container"]}`}>
        <ul className={styles.list}>
          {stackValues &&
            stackValues.map((item, index) => (
              <li className={`${styles["list-elem"]}`} key={index}>
                {index === stackValues.length - 1 && (
                  <p className={`${styles["list-el-info"]}`}>top</p>
                )}
                <Circle letter={item.char} state={item.state} />
                <p className={`${styles["list-el-info"]}`}>{index}</p>
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
