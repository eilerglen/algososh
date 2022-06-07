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
  const renderDefault: any[] =  Array.from({ length: MAX_SIZE }, () => ({
    char: "",
    state: TStatusObject.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [renderValues, setRenderValues] =
    useState<QueueObject[]>(renderDefault);
  const [queue, setQueue] = useState<IQueue<string>>(queueInstanse); //стейт инстанса класса
  const [headIdx, setHeadIdx] = useState<number | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);

  //Добавить в очередь
 const tempArr= [...renderValues];
  
  const handleEnqueue = async () => {
    queue.enqueue(inputValue);
    
    //Получаем индексы
    const currentHead = queue.getHead()
    const currentTail = queue.getTail()
    console.log(currentHead)
    //Получаем значения по индексам
    const valueHead = queue.getValue(currentHead)
    const valueTail = queue.getValue(currentTail)
    //Заполняем массив объектами из очереди
    tempArr[currentHead].char = valueHead
    tempArr[currentHead].head = "head"
    if(currentTail > 0) {
      tempArr[currentTail - 1].tail = ""
      tempArr[currentTail].char = valueTail
      
    }
    tempArr[currentTail].char = valueTail
    tempArr[currentTail].state = TStatusObject.Changing;
    setRenderValues([... tempArr]);
    await pause(SHORT_PAUSE);
    tempArr[currentTail].tail = "tail";
    tempArr[currentTail].state = TStatusObject.Default;
    setRenderValues([...tempArr]); 
    await pause(SHORT_PAUSE);

  };

 //Удалить из очереди
 const handleDequeue = async () => {
  const currentHead = queue.getHead()
  const currentTail = queue.getTail()

  if (currentHead === currentTail) {
    handleClear();
  }
  queue.dequeue();
  const newHead = queue.getHead()
  if (newHead > 0) {
    tempArr[newHead-1].head = "";
    tempArr[newHead-1].char = "";
    tempArr[newHead-1].state = TStatusObject.Changing;
    setRenderValues([...tempArr]);
    await pause(SHORT_PAUSE);
    tempArr[newHead-1].state = TStatusObject.Default;

  }
  
  tempArr[newHead].head = "head";
  setRenderValues([...tempArr]);
  await pause(SHORT_PAUSE);
  tempArr[newHead].state = TStatusObject.Default;
  setRenderValues([...tempArr]);
  await pause(SHORT_PAUSE);
};

  //Очистить очередь
  const handleClear = () => {
    const newQueueInstanse = new Queue<string>(7);
    setQueue(newQueueInstanse);
    setRenderValues([...renderDefault]);
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
