import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button/button";
import { Input } from "../ui/input/input";
import { Stack } from "./utils";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import { StackObject } from "../../types/stackItem";
import { IStack } from "./utils";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const stackInstanse = new Stack<string>();
  const [inputValue, setInputValue] = useState<string>("");
  const [renderValues, setRenderValues] = useState<Array<StackObject>>([]);
  const [stackValues, setStackValues] = useState<IStack<string>>(stackInstanse);
  const [inProgress, setInProgress] = useState<boolean>(false);


  //Добавить значение в стек

  const handlePush = async () => {
    setInProgress(true);
    stackValues.push(inputValue);
    // setStackValues([...stackValues]);
    const newElement = stackValues.peak();
    renderValues.push({
      char: newElement,
      state: TStatusObject.Changing,
      head: "top",
    });
    setRenderValues([...renderValues]);
    await pause(SHORT_PAUSE);
    renderValues[renderValues.length - 1].state = TStatusObject.Default;
    setRenderValues([...renderValues]);
    resetInput();
    setInProgress(false);
  };

  

  //Удалить значение из стека

  const handlePop = async () => {
    setInProgress(true);
    stackValues!.pop();
    const size = stackValues.getSize();
    if (size !== 0) {
      renderValues[renderValues.length - 1].state = TStatusObject.Changing;
      renderValues[renderValues.length - 1].head = "top";
      setRenderValues([...renderValues]);
      renderValues.pop();
      await pause(SHORT_PAUSE);
      // renderValues[renderValues.length - 1].state = TStatusObject.Default;
      // await pause(SHORT_PAUSE);
      setRenderValues([...renderValues]);
    } else {
      setRenderValues([]);

    }
    setInProgress(false);
  };

 //Сброс инпута.
 const resetInput = () => {
  setInputValue("");
}

  //Очистить все данные.
  const clear = () => {
    setRenderValues([]);
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
          value = {inputValue}
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
          disabled={renderValues.length === 0 || inProgress}
        />
        <Button
          text={"Очистить"}
          mixin={styles.button}
          disabled={renderValues.length === 0 || inProgress}
          onClick={clear}
        />
      </div>
      <div className={`${styles["flex-container"]}`}>
        <ul className={styles.list}>
          {renderValues &&
            renderValues.map((item, index) => (
              <li className={`${styles["list-elem"]}`} key={index}>
                {index === renderValues.length - 1 && (
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
