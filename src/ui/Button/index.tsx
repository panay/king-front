import React, { ButtonHTMLAttributes, ReactElement } from "react";
import InputButton from "./InputButton";
import IconButton from "./IconButton";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<any> & {
  onClick?: () => void;
  icon?: ReactElement;
  className?: string;
};

function Button({ icon, onClick, className, ...props }: Props) {
  return icon ? (
    <IconButton
      icon={icon}
      {...props}
      onClick={onClick}
      className={`${styles.button} ${className} text-white bg-primary `}
    />
  ) : (
    <InputButton
      {...props}
      onClick={onClick}
      className={`${styles.button} ${className} text-white bg-primary`}
    />
  );
}

export default Button;
