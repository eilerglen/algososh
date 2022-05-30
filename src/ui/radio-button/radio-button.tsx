import React, { FC } from "react";
import stylesRadioInput from "./radio-button.module.css";
import { generateID } from "../../utils/generateId";
import { nanoid } from "nanoid";

interface RadioButtonProps extends React.HTMLProps<HTMLInputElement>{
  label: string;
  mixin: string;
 
}

export const RadioButton: FC<RadioButtonProps> = ({
  label = "Введите текст",
  mixin="",
  ...rest
 
}) => {
  const id = nanoid();
  return (
    <div className={`${stylesRadioInput.content} ${mixin}`}>
      <input
        className={stylesRadioInput.input}
        id={id}
        {...rest}
      />
      <label
        className={`text text_type_button ${stylesRadioInput.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
