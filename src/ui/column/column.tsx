import React, { FC } from "react";
import styleColumn from "./column.module.css";
import {TStatusObject} from '../../types/statusObject'

interface ColumnProps {
  index: number;
  state?: TStatusObject;
  mixin?: string;
}

export const Column: FC<ColumnProps> = ({ index, state = TStatusObject.Default, mixin }) => {
  return (
    <div className={`${styleColumn.content} ${mixin}`}>
      <div className={`${styleColumn.column} ${styleColumn[state]}`}
       style={{ height: (320 * index) / 100 || 1 }}
       >
      </div>
      <p className={`text text_type_column text_color_input mt-3`}>{index}</p>
    </div>

  )

};
