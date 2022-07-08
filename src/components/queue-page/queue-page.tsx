import React, { useState } from "react";
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { Circle } from "../../ui/circle/circle";
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import { SHORT_PAUSE } from "../../constants/constants";
import { TStatusObject } from "../../types/enums/statusObject";
import { pause } from "../../utils/utils";
import styles from "./queue-page.module.css";
import { Queue } from "./utils";
import { IQueue } from "./utils";
import { QueueObject } from "../../types/queueItem";
import { MAX_SIZE } from "./utils";
import { IStackObject } from "../../types/stackItem";

export const QueuePage: React.FC = () => {
  //Создаем инстанс класса
  const queueInstanse = new Queue<string>(MAX_SIZE);

  //Создаем стартовый рендер
  const renderDefault: IStackObject[] = Array.from({ length: MAX_SIZE }, () => ({
    char: "",
    state: TStatusObject.Default,
  }));

  //Создаем пачку стейтов
  const [inputValue, setInputValue] = useState<string>("");
  const [renderValues, setRenderValues] =
    useState<QueueObject[]>(renderDefault);
  const [queue, setQueue] = useState<IQueue<string>>(queueInstanse); //стейт инстанса класса
  const [inProgress, setInProgress] = useState<boolean>(false);
  
  
  const tempArr = [...renderValues];

  //Добавить в очередь
  const handleEnqueue = async () => {
    setInProgress(true);
    
    queue.enqueue(inputValue);
    if(queue.isEmpty()) {
     
    }
   
    //Получаем индексы
    const currentHead = queue.getHead();
    const currentTail = queue.getTail();
    //Получаем значения по индексам
    const valueHead = queue.getValue(currentHead);
    const valueTail = queue.getValue(currentTail);
    tempArr[currentTail].state = TStatusObject.Changing;
    setRenderValues([...tempArr]);
    await pause(SHORT_PAUSE);
    //Заполняем массив объектами из очереди
    tempArr[currentHead].char = valueHead;
    tempArr[currentHead].head = "head";
    if (currentTail > 0) {
      tempArr[currentTail - 1].tail = "";
      tempArr[currentTail].char = valueTail;
    }
    tempArr[currentTail].char = valueTail;
    tempArr[currentTail].tail = "tail";
    tempArr[currentTail].state = TStatusObject.Default;
    setRenderValues([...tempArr]);
    await pause(SHORT_PAUSE);
    setInProgress(false);
    resetInput();
  };

  //Удалить из очереди
  const handleDequeue = async () => {
    setInProgress(true);
    // Проверяем, догнала ли голова хвост, если да - сброс
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head === tail) handleClear();
    else {
      queue.dequeue()
      const currentHead = queue.getHead();
      const currentTail = queue.getTail();
      if (currentHead > 0) {
        tempArr[currentHead -1].head = "";
        tempArr[currentHead -1].char = "";
      }  
        tempArr[currentHead].state = TStatusObject.Changing;
        setRenderValues([...tempArr]);
        await pause(SHORT_PAUSE);
        tempArr[currentHead].char =  queue.getValue(currentHead) ;
        tempArr[currentHead].head = "head";
        setRenderValues([...tempArr]);
        await pause(SHORT_PAUSE);
        tempArr[currentHead].state = TStatusObject.Default;
      }
   
    setInProgress(false);
  };

  //Очистить очередь
  const handleClear = () => {
    queue.clear()
    setRenderValues([...renderDefault]);
  };


  //Сброс инпута.
  const resetInput = () => {
    setInputValue("");
  };
  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles["flex-container"]}`}>
        <Input
          maxLength={4}
          extraClass={styles.input}
          isLimitText={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
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
          disabled={inProgress || queue.isEmpty()}
        />
        <Button
          text={"Очистить"}
          mixin={styles.button}
          onClick={handleClear}
          disabled={inProgress || queue.isEmpty()}
        />
      </div>

      <div className={`${styles["flex-container"]}`}>
        <ul className={styles.list}>
          {renderValues &&
            renderValues.map((elem: any, ind: number) => (
              <li className={`${styles["list-elem"]}`} key={ind}>
                <Circle
                  letter={elem.char}
                  state={elem.state}
                  index = {ind}
                  head={elem.head}
                  tail={elem.tail}
                />
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
