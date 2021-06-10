import React, {ReactElement, Ref, SyntheticEvent} from "react";
import styles from "./Checkbox.module.scss";

type Props = {
  id?: string;
  name: string;
  value: string;
  checked?: boolean;
  icon?: ReactElement;
  onInputChange?: (inputElement: HTMLInputElement) => void;
  inputRef?: Ref<HTMLInputElement>;
};

function Checkbox(props: Props) {
  const handleClickLabel = (event: SyntheticEvent) => {
    const input: HTMLInputElement = event.currentTarget
      .children[0] as HTMLInputElement;

    if (props.onInputChange) {
      event.preventDefault();
      event.stopPropagation();
      props.onInputChange(input);
    }
  };

  const handleChangeInput = (event: SyntheticEvent) => {
    const input: HTMLInputElement = event.currentTarget as HTMLInputElement;

    if (props.onInputChange) {
      event.preventDefault();
      event.stopPropagation();
      props.onInputChange(input);
    }
  };

  return (
    <label className={styles.label} onClick={handleClickLabel}>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={props.checked}
        value={props.value}
        ref={props.inputRef}
        onChange={handleChangeInput}
      />
      <span className={styles.box} />
      {props.icon || props.value}
    </label>
  );
}

export default Checkbox;
