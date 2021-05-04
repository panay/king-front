import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  SyntheticEvent,
  useRef,
} from "react";
import { ReactComponent as IcSearch } from "infrastructure/assets/images/svgs/ic-search.svg";
import styles from "./SearchInput.module.scss";
import { useDebouncedCallback } from "use-debounce";

type Props = InputHTMLAttributes<unknown> & {
  onSearch: (value: string) => void;
  noSearchIcon?: boolean;
};

function SearchInput({
  onSearch,
  noSearchIcon = false,
  ...props
}: Props) {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const handleSearchEvent = (event: SyntheticEvent) => {
    event.preventDefault();
    onSearch(inputSearchRef.current!.value);
  };

  const handleKeyDown = (event: KeyboardEvent<unknown>) => {
    if (event.key === "Enter") {
      onSearch(inputSearchRef.current!.value);
    }
  };

  const debouncedSearchEvent = useDebouncedCallback(
    () => onSearch(inputSearchRef.current!.value),
    400
  );

  const showSearchIcon = () => {
    return noSearchIcon ? (
      <></>
    ) : (
      <button type="button" className={styles.icon} onClick={handleSearchEvent}>
        <IcSearch className="text-icon-grey" />
      </button>
    );
  };

  return (
    <label className={styles.label}>
      <input
        ref={inputSearchRef}
        {...props}
        onChange={debouncedSearchEvent}
        onKeyDown={handleKeyDown}
        className={props.className}
      />
      <span className={styles.placeholder}>{props.placeholder || "Поиск"}</span>
      {showSearchIcon()}
    </label>
  );
}

export default SearchInput;
