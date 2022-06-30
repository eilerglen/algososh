import React, { FC } from "react";
import { generateID } from "../../utils/generateId";
import styles from "./radio-button.module.css";

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  mixin?: string;
}

export const RadioButton: FC<RadioProps> = ({
  label = "Введите текст",
  mixin = "",
  ...rest
}) => {
  const id = generateID();

  return (
    <div data-testid="radioWrapper" className={`${styles.content} ${mixin}`}>
      <input
        data-testid="radioButton"
        className={styles.input}
        type="radio"
        id={id}
        {...rest}
      />
      <label className={`text text_type_button ${styles.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
