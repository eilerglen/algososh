import React from "react";
import styles from "./button.module.css";
import loaderIcon from "../../images/icons/loader.svg";
import { Ascending } from "../../ui/icons/ascending/ascending";
import { Descending } from "../../ui/icons/descending/descending";
import  {Direction}  from "../../types/enums/direction";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text?: string;
  type?: "button" | "submit" | "reset";
  sorting?: Direction;
  linkedList?: "small" | "big";
  isLoader?: boolean;
  mixin?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  mixin = "",
  type = "button",
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}) => {
  const currentIcon =
    sorting === "ascending" ? <Ascending /> : <Descending />;
  const className = `text text_type_button text_color_primary ${
    styles.button
  } ${linkedList && styles[linkedList]} ${
    isLoader && styles.loader
  } ${mixin}`;

  return (
    <button
      className={className}
      type={type}
      disabled={isLoader || disabled}
      {...rest}
    >
      {isLoader ? (
        <img className={styles.loader_icon} src={loaderIcon} alt="Загрузка." />
      ) : (
        <>
          {sorting && currentIcon}
          <p className={`text ${sorting && "ml-5"}`}>{text}</p>
        </>
      )}
    </button>
  );
};
