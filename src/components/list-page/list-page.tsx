import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useEffect, useState } from "react";
import { TStatusObject } from "../../types/statusObject";
import { listItemProps } from "../../types/listItem";
import { pause } from "../../utils/utils";
import { LinkedList, ILinkedList } from "./utils";
import styles from "./list-page.module.css";
import { Button } from "../../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_PAUSE } from "../../constants/pauseLimits";
import { Input } from "../ui/input/input";
import { getNumber } from "../../utils/utils";

export const ListPage: React.FC = () => {
  const maxNum = 12;
  const minNum = 6;

  useEffect(() => {
    const stringsArray = Array.from({ length: minNum }, () => `${getNumber()}`);
    const basicState: listItemProps[] = [];
    const newLinkedList = new LinkedList<string>(stringsArray);
    stringsArray.forEach((item) => {
      basicState.push({
        char: item,
        state: TStatusObject.Default,
      });
    });

    setLinkedList(newLinkedList);
    setArrayCircles(basicState.reverse());
  }, []);

  const [value, setValue] = useState<string>("");
  const [idx, setIdx] = useState<number>();
  const [arrayOfCircles, setArrayCircles] = useState<listItemProps[]>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();

  const sortAndWait = async (arr: listItemProps[]) => {
    setArrayCircles([...arr]);
    await pause(SHORT_PAUSE);
  };

  const addToHead = async () => {
    const copyArr = [...arrayOfCircles];
    linkedList!.print();
    // Добавляем новую голову в наш список
    linkedList!.insertFromPosition(value, 0);
    // Сразу извлекаем для рендера из списка новый элемент
    const headValue = linkedList!.getNodeToIndex(0);
    linkedList!.print();
    // Подсвечиваем голову
    copyArr[0] = {
      ...copyArr[0],
      adding: true,
      extraCircle: {
        char: headValue ? headValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новую голову
    copyArr[0] = {
      ...copyArr[0],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.unshift({
      char: headValue ? headValue : "",
      state: TStatusObject.Modified,
    });
    await sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[0].state = TStatusObject.Default;
    setValue("");
  };

  //Добавить в конце списка
  const addToTail = async () => {
    const copyArr = [...arrayOfCircles];
    linkedList!.print();
    // Добавляем элемент в хвост
    linkedList!.addToTail(value);
    // Получаем размер списка (он же индекс хвоста)
    const tailIdx = linkedList!.getSize() - 1;
    // Сразу извлекаем из хвоста списка новый элемент
    const TailValue = linkedList!.getNodeToIndex(tailIdx);
    linkedList!.print();
    // Запускаем цикл
    for (let i = 0; i <= tailIdx; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: TailValue ? TailValue : "",
        },
      };
      if (i > 0) {
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: TStatusObject.Changing,
        };
      }
      await sortAndWait([...copyArr]);
    }
    // Добавляем в хвост списка новый элемент
    copyArr[copyArr.length - 1] = {
      ...copyArr[copyArr.length],
      char: TailValue ? TailValue : "",
      state: TStatusObject.Modified,
      adding: false,
      extraCircle: undefined,
    };
    await sortAndWait([...copyArr]);
    // Меняем стейт хвоста
    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    await sortAndWait([...copyArr]);
    setValue("");
  };

  //Добавить в конце списка
  const removeFromHead = async () => {
    const copyArr = [...arrayOfCircles];
    linkedList!.print();
    // Удаляем элемент из списка и сразу берём его значение
    const deletedElement = linkedList!.deleteHead();
    linkedList!.print();
    // Смещаем голову в нижний кружок
    copyArr[0] = {
      ...copyArr[0],
      char: "",
      deleting: true,
      extraCircle: {
        char: "",
      },
    };

    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новую голову
    copyArr.shift();
    copyArr[0].state = TStatusObject.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с новой головы
    copyArr[0].state = TStatusObject.Default;
  };


  //Удалить из конца списка

  const removeFromTail = async () => {
    const copyArr = [...arrayOfCircles];
    const { length } = copyArr;
    linkedList!.print();
    // Получаем индекс хвоста
    const tailIdx = linkedList!.getSize() - 1;
    // Удаляем элемент из списка и сразу берём его значение
    const deletedElement = linkedList!.removeFromPosition(tailIdx);
    linkedList!.print();
    // Смещаем хвост в нижний кружок
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новый хвост
    copyArr.pop();
    copyArr[length - 2].state = TStatusObject.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с нового хвоста
    copyArr[length - 2].state = TStatusObject.Default;
  };

  //Добавить по индексу
  const addByIdx = async (idx: number) => {
    const copyArr = [...arrayOfCircles];
    linkedList!.print();
    // Добавляем новую элемент в наш список
    linkedList!.insertFromPosition(value, idx);
    // Сразу извлекаем для рендера из списка новый элемент
    const newValue = linkedList!.getNodeToIndex(idx);
    linkedList!.print();
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
      await sortAndWait([...copyArr]);
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
    await sortAndWait([...copyArr]);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    setValue("");
    setIdx(undefined);
  };

  // Удалить по
  const removeByIdx = async (idx: number) => {
    const copyArr = [...arrayOfCircles];
    const deletingValue = copyArr[idx!].char;
    linkedList!.print();
    // Удаляем элемент из списка
    const deletedElement = linkedList!.removeFromPosition(idx);
    linkedList!.print();
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = TStatusObject.Changing;
      if (i === idx) copyArr[i].noArrow = true;
      await sortAndWait([...copyArr]);
    }
    // Показываем удаляемый элемент
    copyArr[idx!] = {
      ...copyArr[idx!],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент
    copyArr.splice(idx!, 1);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = TStatusObject.Default));
    setIdx(undefined);
    await sortAndWait([...copyArr]);
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
            disabled={!value || arrayOfCircles.length > maxNum}
            // isLoader={addingToHead}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            mixin={styles.button}
            // isLoader={addingToTail}
            disabled={!value || arrayOfCircles.length > maxNum}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            mixin={styles.button}
            disabled={arrayOfCircles.length <= 1}
            // isLoader={deletingFromHead}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            mixin={styles.button}
            disabled={arrayOfCircles.length <= 1}
            // isLoader={deletingFromTail}
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
              false
              // !value ||
              // !idx ||
              // inProgress ||
              // idx > arrayOfCircles.length - 1 ||
              // arrayOfCircles.length > maxNum
            }
            // isLoader={addingByIdx}
            text="Добавить по индексу"
            type="button"
            onClick={() => idx && addByIdx(idx)}
          />
          <Button
            mixin={styles.bigButton}
            // isLoader={deletingByIdx}
            disabled={!idx || idx > arrayOfCircles.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={() => idx && removeByIdx(idx)}
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
              {/* {idx !== arrayOfCircles.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === TStatusObject.Changing && !char.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )} */}
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
