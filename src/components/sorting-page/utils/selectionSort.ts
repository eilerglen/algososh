import { swap } from "../../../utils/utils";
import { TStatusObject } from "../../../types/enums/statusObject";
import { Direction } from "../../../types/enums/direction";
import { columnObject } from "../../../types/columns";

export const selectionSortAlgo = (
  option: Direction,
  initialArr: columnObject[],
  step?: number
): { resultArray: columnObject[]; countSteps: number } => {
  const arrTemp = [...initialArr];

  arrTemp.forEach((item) => (item.state = TStatusObject.Default));
  // Начинаем цикл
  const { length } = arrTemp;

  // Инициализация счётчика шагов алгоритма

  let currentStep = 0;
  for (let i = 0; i < length; i++) {
    let swapInd = i;
    arrTemp[i].state = TStatusObject.Chosen;

    //Инкрементируем счетчик
    currentStep++;
    if (step && step === currentStep)
      return { resultArray: arrTemp, countSteps: currentStep };

    // Начинаем цикл по оставшимся элементам
    for (let j = i + 1; j < length; j++) {
      // Подсвечиваем кандидата на свап фиолетовым
      arrTemp[j].state = TStatusObject.Changing;

      //Инкрементируем счетчик

      currentStep++;
      if (step && step === currentStep)
        return { resultArray: arrTemp, countSteps: currentStep };
      if (
        (option === Direction.Ascending ? arrTemp[swapInd].num : arrTemp[j].num) >
        (option === Direction.Ascending ? arrTemp[j].num : arrTemp[swapInd].num)
      ) {
        arrTemp[j].state = TStatusObject.Chosen;
        arrTemp[swapInd].state =
          i === swapInd ? TStatusObject.Chosen : TStatusObject.Default;
        swapInd = j;

        //Инкрементируем счетчик
        currentStep++;
        if (step && step === currentStep)
          return { resultArray: arrTemp, countSteps: currentStep };
      }
      // Снимаем выделение с обычных элементов
      if (j !== swapInd) arrTemp[j].state = TStatusObject.Default;
    }
    // Если сортируемый элемент сам является экстремумом - рисуем его как "modified"
    if (i === swapInd) {
      arrTemp[i].state = TStatusObject.Modified;

      //Инкрементируем счетчик

      currentStep++;
      if (step && step === currentStep)
        return { resultArray: arrTemp, countSteps: currentStep };
    }
    // В противном случае нужен свап и замена цветов (нужно 2 рендера)
    else {
      swap(arrTemp, i, swapInd);
      //arr[swapInd].state = ElementStates.Default;
      arrTemp[i].state = TStatusObject.Modified;

      //Инкрементируем счетчик

      currentStep++;
      if (step && step === currentStep)
        return { resultArray: arrTemp, countSteps: currentStep };

      arrTemp[swapInd].state = TStatusObject.Default;

      //Инкрементируем счетчик

      currentStep++;
      if (step && step === currentStep)
        return { resultArray: arrTemp, countSteps: currentStep };
    }
  }
  return { resultArray: arrTemp, countSteps: currentStep };
};
