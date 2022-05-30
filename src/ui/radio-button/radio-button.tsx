import React, {FC} from "react";
import stylesRadioInput from './radio-button.module.css' 

interface RaduioButtonProps {
    label: string,
    name: string,
    value: string,
    onClick: () => void,
    mixin: string
}

export const RadioButton: FC<RaduioButtonProps> = ({
    label = "Введите текст",
    name, 
    value,
    onClick,
    mixin}) => {
    return (
        <div className={`${stylesRadioInput.content} ${mixin}`}>
          <input className={stylesRadioInput.input}
             type="radio"
             onClick={onClick}
            />
          <label className={`text text_type_button ${stylesRadioInput.label}`}>
            {label}
          </label>
        </div>
      );

}

  

