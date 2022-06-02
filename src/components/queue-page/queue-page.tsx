import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Button } from "../../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import {StackObject} from '../../types/stackItem'
import styles from "./queue-page.module.css";
import { Queue } from "./utils";

const queue = new Queue(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queueValues, setQueue] = useState<Array<any>>();
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleEnqueue = async () => {
    setInProgress(true);
    // await queue.enqueue(inputValue, setQueue);
    setInProgress(false);
    setInputValue("");
    resetInput();
  }

  const handleDequeue = async () => {
    setInProgress(true);
    // await queue.dequeue(setQueue);
    setInProgress(false);
  }

  const handleClear = () => {
    // queue.clear(setQueue);
  }

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll('input')[0].value = "";
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles['flex-container']}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText={true}
          onChange={(e: any) => { setInputValue(e.target.value) }}
        />
        <Button
          text={"Добавить"}
          mixin={styles.button}
          onClick={handleEnqueue}
          disabled={inputValue.length === 0 || inProgress}
        />
        <Button
          text={"Удалить"}
          mixin={styles.button}
          onClick={handleDequeue}
          disabled={inProgress}
        />
        <Button
          text={"Очистить"}
          mixin={styles.button}
          disabled={inProgress}
          onClick={handleClear}
        />
      </div>

      <div className={`${styles['flex-container']}`}>
        <ul className={styles.list}>
          {queueValues && queueValues.map((elem: any, ind: number) =>
            <li className={`${styles['list-elem']}`} key={ind}>
              <p className={`${styles['list-el-info']}`}>{ind === queue.getHead() ? "head" : " "}</p>
              <Circle
                letter={elem.symbol}
                state={elem.state}
              />
              <p className={`${styles['list-el-info']}`}>{ind === queue.getTail() ? "tail" : " "}</p>
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
