import React, { SyntheticEvent } from "react";
import styles from "./Checkbox.module.scss";

type Props = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onInputChange: (inputElement: HTMLInputElement) => void;
};

function Checkbox(props: Props) {
  const handleClickLabel = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const input: HTMLInputElement = event.currentTarget
      .children[0] as HTMLInputElement;

    props.onInputChange(input);
  };

  const handleChangeInput = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const input: HTMLInputElement = event.currentTarget as HTMLInputElement;

    props.onInputChange(input);
  };

  return (
    <label className={styles.label} onClick={handleClickLabel}>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={props.checked}
        value={props.value}
        onChange={handleChangeInput}
      />
      <span className={styles.box} />
      {props.value}
    </label>
  );
}

export default Checkbox;
