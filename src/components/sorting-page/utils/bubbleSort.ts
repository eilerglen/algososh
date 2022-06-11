
import { swap} from "../../../utils/utils";
import { columnObject } from "../../../types/columns";
import { TStatusObject } from "../../../types/enums/statusObject";
import { Direction } from "../../../types/enums/direction";
import { focusingCurrentElements} from "./modificateStatus";


// ***** BubbleSort ***** 

export const bubbleSortAlgo = (
  option: Direction,
  initialArr: columnObject[],
  step?: number
): {resultArray: columnObject[]; countSteps: number} => {

  // Создаем копию массива столбцов и меняем цвет на Default
  const arr = [...initialArr];
  arr.forEach(item => (item.state = TStatusObject.Default));
  const {length} = arr;

// Инициализация счётчика шагов алгоритма
  let currentStep = 0;

  //Внешний цикл
  for (let i = 0; i < length - 1; i++) {
    //Внутренний цикл
    for (let j = 0; j < length - 1- i; j++) {

      focusingCurrentElements(arr, j, TStatusObject.Changing);
      //Инкрементируем счетчик
      currentStep++;
      // Если все отсортировано - возвращаем результирующий объект
      if (step === currentStep)
        return {resultArray: arr, countSteps: currentStep};

      // Задаем опции сравнения элементов по убыванию или по возрастанию  
      if (
        (option === Direction.Ascending ? arr[j].num : arr[j + 1].num) >
        (option === Direction.Ascending ? arr[j + 1].num : arr[j].num)
      ) {

        // Двух сравниваемых стобцов обозначаем желтым цветом
        focusingCurrentElements (arr, j, TStatusObject.Chosen)
      
         //Инкрементируем счетчик
        currentStep++
        if (step === currentStep)
          return {resultArray: arr, countSteps: currentStep};

        swap(arr, j, j + 1);
        arr[j].state =TStatusObject.Chosen;
        arr[j + 1].state = TStatusObject.Chosen;

        //Инкрементируем счетчик
        currentStep++;
        if (step === currentStep)
          return {resultArray: arr, countSteps: currentStep};
      }

      //Возвращаем дефолтный вид двух текущих столбцов
      focusingCurrentElements (arr, j, TStatusObject.Default)
     
    }
    arr[arr.length - 1 - i].state = TStatusObject.Modified; 
  }
   // Всех стобцы помечаем как измененные
  arr.forEach(item => (item.state = TStatusObject.Modified));
  return {resultArray: arr, countSteps: currentStep};
};