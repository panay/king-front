import React, {
  InputHTMLAttributes,
  ReactElement,
  Ref,
  SyntheticEvent,
} from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<unknown> & {
  onIconClick?: () => void;
  icon?: ReactElement;
  inputRef?: Ref<HTMLInputElement>;
};

function Input({ icon, onIconClick, inputRef, ...props }: Props) {
  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onIconClick) {
      onIconClick();
    }
  };

  return (
    <label className={styles.label}>
      <input ref={inputRef} {...props} />
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
