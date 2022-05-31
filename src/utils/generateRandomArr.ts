
import { TStatusObject } from "../types/statusObject";
import { columnObject } from "../types/columns";

export const generateRandomArr = () => {
    let initArr = [];
    const count = Math.floor(Math.random() * 14 + 3);
    for (let i = 0; i < count; i++) {
      initArr.push({
        num: Math.floor(Math.random() * 101),
        state: TStatusObject.Default,
      });
    }
    return initArr
  };