import React, { useState } from "react";
import { Button } from "../../ui/button/button";
import { Input } from "../ui/input/input";
import { Stack } from "./utils";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import { StackObject } from "../../types/stackItem";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const stackInctance = new Stack<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [stackValues, setStackValues] = useState<Array<any>>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Добавить значение в стек
  const handlePush = async () => {
    setInputValue("");
    resetInput();
    stackInctance.push(inputValue);
    setStackValues([...stackValues]);
    const newElement = stackInctance.peak();
    console.log(newElement);
    stackValues.push({
      char: newElement,
      state: TStatusObject.Changing,
      head: "top",
    });
    setStackValues([...stackValues]);
    await pause(SHORT_PAUSE);
    stackValues[stackValues.length - 1].state = TStatusObject.Default;
    setStackValues([...stackValues]);
    console.log(stackInctance.getSize())
  };

  //Удалить значение из стека

  const handlePop = async() => {
    console.log(stackInctance.getSize())
    stackValues[stackValues.length - 1].state = TStatusObject.Changing;
    setStackValues([...stackValues]);
    await pause(SHORT_PAUSE);
    stackValues.pop();
    setStackValues([...stackValues]);
    await pause(SHORT_PAUSE);
    stackValues[stackValues.length - 1].head = "top";
    stackValues[stackValues.length - 1].state = TStatusObject.Default;
    await pause(SHORT_PAUSE);
  };

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll("input")[0].value = "";
  };

  //Очистить все данные.
  const clear = () => {
    setStackValues([]);
  };

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
          onClick={handlePush}
        />
        <Button
          text={"Удалить"}
          mixin={styles.button}
          onClick={handlePop}
          disabled={stackValues.length === 0 || inProgress}
        />
        <Button
          text={"Очистить"}
          mixin={styles.button}
          disabled={stackValues.length === 0 || inProgress}
          onClick={clear}
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
