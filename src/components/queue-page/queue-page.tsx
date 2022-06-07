import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Button } from "../../ui/button/button";
import { Input } from "../ui/input/input";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { TStatusObject } from "../../types/statusObject";
import { pause } from "../../utils/utils";
import styles from "./queue-page.module.css";
import { Queue } from "./utils";
import { IQueue } from "./utils";
import { QueueObject } from "../../types/queueItem";
import { MAX_SIZE } from "./utils";

export const QueuePage: React.FC = () => {
  //Создаем инстанс класса
  const queueInstanse = new Queue<string>(MAX_SIZE);

  //Создаем стартовый рендер
  const renderDefault: any[] = Array.from({ length: MAX_SIZE }, () => ({
    char: "",
    state: TStatusObject.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [renderValues, setRenderValues] = useState<QueueObject[]>(renderDefault);
  const [queue, setQueue] = useState<IQueue<string>>(queueInstanse); //стейт инстанса класса
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Добавить в очередь
  const copyArr = [...renderValues];

  const handleEnqueue = async () => {
    queue.enqueue(inputValue);
    const currentHead = queue.getHeadValue();
    const currentTail = queue.getTailValue();
    copyArr[currentHead.index].char = currentHead.value!;
    copyArr[currentHead.index].head = "head";
    if (currentTail.index > 0) {
      copyArr[currentTail.index - 1].tail = "";
    }
    copyArr[currentTail.index].char = inputValue;
    copyArr[currentTail.index].state = TStatusObject.Changing;
    setRenderValues([...copyArr]);
    await pause(SHORT_PAUSE);
    copyArr[currentTail.index].tail = "tail";
    copyArr[currentTail.index].state = TStatusObject.Default;
    setRenderValues([...copyArr]);
    await pause(SHORT_PAUSE);
  };

  //Удалить из очереди
  const handleDequeue = async () => {
    const currentHead = queue.getHeadValue();
    const currentTail = queue.getTailValue();
    if (currentHead.index === currentTail.index) {
      handleClear();
    }
    queue.dequeue();
    const newHead = queue.getHeadValue();
    const newTail = queue.getTailValue();
    if (newHead.index > 0) {
      copyArr[newHead.index-1].head = "";
      copyArr[newHead.index-1].char = "";
      copyArr[newHead.index-1].state = TStatusObject.Changing;
      setRenderValues([...copyArr]);
      await pause(SHORT_PAUSE);
      copyArr[newHead.index-1].state = TStatusObject.Default;

    }
    copyArr[newHead.index].head = "head";
    // copyArr[newHead.index].state = TStatusObject.Changing;
    setRenderValues([...copyArr]);
    await pause(SHORT_PAUSE);
    copyArr[newHead.index].state = TStatusObject.Default;
    setRenderValues([...copyArr]);
    await pause(SHORT_PAUSE);
  };

  //Очистить очередь
  const handleClear = () => {
    const newQueueInstanse = new Queue<string>(7);
    setQueue(newQueueInstanse);
    setRenderValues([...renderDefault]);
  };

  //Сборос инпута.
  const resetInput = () => {
    document.querySelectorAll("input")[0].value = "";
  };

  return (
    <SolutionLayout title="Очередь">
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

      <div className={`${styles["flex-container"]}`}>
        <ul className={styles.list}>
          {renderValues &&
            renderValues.map((elem: any, ind: number) => (
              <li className={`${styles["list-elem"]}`} key={ind}>
                {/* <p className={`${styles["list-el-info"]}`}>
                  {ind === queue.getHead() ? "head" : " "}
                </p> */}
                <Circle
                  letter={elem.char}
                  state={elem.state}
                  head={elem.head}
                  tail={elem.tail}
                />
                {/* <p className={`${styles["list-el-info"]}`}>
                  {ind === queue.getTail() ? "tail" : " "}
                </p> */}
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
