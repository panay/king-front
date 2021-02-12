import React, { InputHTMLAttributes, ReactElement } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<any> & {
  icon?: ReactElement;
};

function Input({ icon, ...props }: Props) {
  return (
    <label className={styles.label}>
      <input {...props} />
      <span className={styles.placeholder}>{props.placeholder}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </label>
  );
}

export default Input;
