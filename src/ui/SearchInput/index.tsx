import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
  useRef,
} from "react";
import { ReactComponent as IcSearch } from "infrastructure/assets/images/svgs/ic-search.svg";
import styles from "./SearchInput.module.scss";

type Props = InputHTMLAttributes<unknown> & {
  onSearch: (value: string) => void;
};

function SearchInput({ onSearch, ...props }: Props) {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onSearch(inputSearchRef.current!.value);
  };

  const handleKeyDown = (event: KeyboardEvent<unknown>) => {
    if (event.key === "Enter") {
      onSearch(inputSearchRef.current!.value);
    }
  };

  return (
    <label className={styles.label}>
      <input ref={inputSearchRef} {...props} onKeyDown={handleKeyDown} />
      <span className={styles.placeholder}>{props.placeholder || "Поиск"}</span>
      <button type="button" className={styles.icon} onClick={handleOnClick}>
        <IcSearch className="text-icon-grey" />
      </button>
    </label>
  );
}

export default SearchInput;
