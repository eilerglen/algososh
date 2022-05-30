import React, {FC} from "react";
import stylesRadioInput from './radio-button.module.css' 

interface RaduioButtonProps {
    label: string 
}

export const RadioButton: FC<RaduioButtonProps> = ({label = "ВВедите текст"}) => {
    return (
        <div className={`${stylesRadioInput.content}`}>
          <input className={stylesRadioInput.input} type="radio"  />
          <label className={`text text_type_button ${stylesRadioInput.label}`}>
            {label}
          </label>
        </div>
      );

}

  

