import React, {
  InputHTMLAttributes,
  ReactElement,
  SyntheticEvent,
} from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<any> & {
  onIconClick?: () => void;
  icon?: ReactElement;
};

function Input({ icon, onIconClick, ...props }: Props) {
  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <label className={styles.label}>
      <input {...props} />
      <span className={styles.placeholder}>{props.placeholder}</span>
      {icon && (
        <button type="button" className={styles.icon} onClick={handleOnClick}>
          {icon}
        </button>
      )}
    </label>
  );
}

export default Input;
