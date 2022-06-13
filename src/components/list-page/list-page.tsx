import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import { useEffect, useState } from "react";
import { TStatusObject } from "../../types/enums/statusObject";
import { listItemProps } from "../../types/listItem";
import { pause } from "../../utils/utils";
import { LinkedList, ILinkedList } from "./utils";
import styles from "./list-page.module.css";
import { Button } from "../../ui/button/button";
import { Circle } from "../../ui/circle/circle";
import { SHORT_PAUSE } from "../../constants/constants";
import { Input } from "../../ui/input/input";
import { getNumber } from "../../utils/utils";
import { LIMIT_SIZE_MAX, LIMIT_SIZE_MIN } from "../../constants/constants";
import { ArrowIcon } from "../../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  useEffect(() => {
    //Создаем стартовый массив символов из 6 элементов
    const randomStringsArray = Array.from(
      { length: LIMIT_SIZE_MIN },
      () => `${getNumber()}`
    );

    //Создаем инстанс класса связного списка и передаем в конструктор массив символов
    const newLinkedList = new LinkedList<string>(randomStringsArray);

    //заполняем стартовый рендер-массив дефолтными кружками с цифрами из массива
    const initRenderCircle: listItemProps[] = randomStringsArray.map((item) => {
      return {
        char: item,
        state: TStatusObject.Default,
      };
    });
    //Закидываем инстанс связного списка в стейт
    setLinkedList(newLinkedList);

    //Закидываем стартовый рендер-массив в стейт
    setArrayCircles(initRenderCircle.reverse());
  }, []);

  const [value, setValue] = useState<string>("");
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>();
  const [arrayOfCircles, setArrayCircles] = useState<listItemProps[]>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();

  //Функция отрисовки верхнего кружочка-превью 

  const addRenderPreviewCircleTop = (
    arr: any,
    index: number,
    value: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: true,
      extraCircle: {
        char: value ? value : "",
      },
    };
  };

  //Функция сброса отрисовки верхнего кружочка-превью
  const removeRenderPreviewCircleTop = (arr: any, index: number) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      adding: false,
      extraCircle: {
        char: value ? value : "",
      },
    };
  };

  //Функция отрисовки нижнего кружочка-превью  элементов списка

  const addRenderPreviewCircleBottom = (
    arr: any,
    index: number,
    value?: string | null
  ) => {
    const firstElement = arr[index];
    arr[index] = {
      ...firstElement,
      deleting: true,
      extraCircle: {
        char: value ? value : "",
      },
    };
  };

  // Создаем промежуточный массив для перезаписи стейта
  const copyArr = [...arrayOfCircles];

  //****** Добавление в начало списка *******

  const addToHead = async () => {
    setInProgress(true)
    // Добавляем новую голову в наш список
    linkedList!.addToHead(value);
    // Получаем новый элемент из инстанса списка
    const currentHeadValue = linkedList!.getNodeToIndex(0);
    // Подсвечиваем добавляемый элемент в мини-кружке

    //Рендерим превью-кружок
    addRenderPreviewCircleTop(copyArr, 0, currentHeadValue);

    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);

    //Убираем превью-кружок
    removeRenderPreviewCircleTop(copyArr, 0);
    //Вставляем новый элемент в начало
    copyArr.unshift({
      char: currentHeadValue ? currentHeadValue : "",
      state: TStatusObject.Modified,
    });

    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);

    // Меняем статус головы
    copyArr[0].state = TStatusObject.Default;
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    setValue("");
    setInProgress(false)
  };

  //***** Удалить из начала списка *****

  const removeFromHead = async () => {
    setInProgress(true)
    // Удаляем элемент из списка и сразу берём его значение
    const deletedElement = linkedList!.deleteHead();

    // Смещаем голову в нижний кружок
    addRenderPreviewCircleBottom(copyArr, 0, deletedElement);
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    // Удаляем элемент и подсвечиваем новую голову
    copyArr.shift();
    copyArr[0].state = TStatusObject.Default;
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    setInProgress(false)
  };

  //***** Добавить в конец списка ******

  const addToTail = async () => {
    setInProgress(true);
    // Добавляем элемент в хвост
    linkedList!.addToTail(value);
    // Получаем размер списка (он же индекс хвоста)
    const tailIdx = linkedList!.getSize() - 1;
    // Сразу извлекаем из хвоста списка новый элемент
    const TailValue = linkedList!.getNodeToIndex(tailIdx);
    addRenderPreviewCircleTop(copyArr, tailIdx-1, TailValue);
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    removeRenderPreviewCircleTop(copyArr, tailIdx-1)

    // Добавляем в хвост списка новый элемент
    copyArr[copyArr.length] = {
      ...copyArr[copyArr.length],
      char: TailValue ? TailValue : "",
      state: TStatusObject.Modified,
      adding: false,
      extraCircle: undefined,
    };
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);

    // Меняем стейт хвоста

    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    setValue("");
  };

  // ***** Удалить из конца списка *****

  const removeFromTail = async () => {
    setInProgress(true)
    //Получаем текущую длину массива
    const { length } = copyArr;
    // Удаляем элемент из списка и сразу берём его значение
    const removeElement = linkedList!.deleteTail();
    // Рендер нижнего кружка с удаляемым элементом
    addRenderPreviewCircleBottom(copyArr, length - 1, removeElement);
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    // Удаляем элемент и подсвечиваем новый хвост
    copyArr.pop();
    // Убираем подсветку с нового хвоста
    copyArr[length - 2].state = TStatusObject.Default;
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    setInProgress(false)

  };

  //**** Добавить по индексу *****

  const addToIndex = async (idx: number) => {
    setInProgress(true)
    const copyArr = [...arrayOfCircles];
    // Добавляем новую элемент в наш список
    linkedList!.insertFromPosition(value, idx);
    // Сразу извлекаем для рендера из списка новый элемент
    const newValue = linkedList!.getNodeToIndex(idx);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: TStatusObject.Changing,
        };
      // await sortAndWait([...copyArr]);
      setArrayCircles([...copyArr]);
      await pause(SHORT_PAUSE);
    }
    // Добавляем элемент по индексу
    copyArr[idx!] = {
      ...copyArr[idx!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(idx!, 0, {
      char: newValue ? newValue : "",
      state: TStatusObject.Modified,
    });
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    // await sortAndWait([...copyArr]);

    // Убираем подсветку
    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    setValue("");
    setIdx(undefined);
    setInProgress(false)
  };

  // ****** Удалить по индексу *****
  const removeToIndex = async (idx: number) => {
    setInProgress(true)
    const deletingValue = copyArr[idx!].char;
    // Удаляем элемент из списка
    const deletedElement = linkedList!.removeFromPosition(idx);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = TStatusObject.Changing;
      if (i === idx) copyArr[i].noArrow = true;
      setArrayCircles([...copyArr]);
      await pause(SHORT_PAUSE);
    }
    //Рендер нижнего кружочка с удаляемым элементом
    addRenderPreviewCircleBottom (copyArr, idx!, deletedElement)
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
   
    // Удаляем элемент
    copyArr.splice(idx!, 1);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    setIdx(undefined);
    setArrayCircles([...copyArr]);
    await pause(SHORT_PAUSE);
    setInProgress(false)
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.containerInput}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={value || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
            isLimitText={true}
            maxLength={4}
          />
          <Button
            mixin={styles.button}
            disabled={!value || arrayOfCircles.length > LIMIT_SIZE_MAX}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            mixin={styles.button}
            disabled={!value || arrayOfCircles.length > LIMIT_SIZE_MAX}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            mixin={styles.button}
            disabled={arrayOfCircles.length <= 1}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            mixin={styles.button}
            disabled={arrayOfCircles.length <= 1}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTail()}
          />
        </div>
        ;
        <div className={styles.containerInput}>
          <Input
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={idx || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setIdx(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            mixin={styles.bigButton}
            disabled={
              !value ||
              !idx ||
              inProgress ||
              idx > arrayOfCircles.length - 1 ||
              arrayOfCircles.length > LIMIT_SIZE_MAX
            }
            // isLoader={addingByIdx}
            text="Добавить по индексу"
            type="button"
            onClick={() => idx && addToIndex(idx)}
          />
          <Button
            mixin={styles.bigButton}
            disabled={!idx || idx > arrayOfCircles.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={() => idx && removeToIndex(idx)}
          />
        </div>
        ;
      </div>
      <ul className={styles.circleList}>
        {arrayOfCircles.map((char, idx) => {
          return (
            <div className={styles.block} key={idx}>
              <Circle
                state={char.state}
                letter={char.char}
                index={idx}
                head={idx === 0 && !char.adding && !char.deleting ? "head" : ""}
                tail={
                  idx === arrayOfCircles.length - 1 &&
                  !char.adding &&
                  !char.deleting
                    ? "tail"
                    : ""
                }
              />
              {idx !== arrayOfCircles.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === TStatusObject.Changing && !char.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {char.adding && (
                <Circle
                  extraClass={styles.upperCircle}
                  state={TStatusObject.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
              {char.deleting && (
                <Circle
                  extraClass={styles.lowerCircle}
                  state={TStatusObject.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
