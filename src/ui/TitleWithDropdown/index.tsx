import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { ReactComponent as IcArrowDropdown } from "infrastructure/assets/images/svgs/ic-arrow-dropdown.svg";
import { IKeyValue } from "infrastructure/types";
import { useOnClickOutside } from "infrastructure/hooks";
import Dropdown from "../Dropdown";
import List from "./components/List";
import Scrollbar from "../Scrollbar";

type Props = {
  current: IKeyValue;
  list: IKeyValue[];
  onOpen: (opened: boolean) => void;
  onSelectItem: (item: IKeyValue) => void;
  children?: ReactElement;
};

function TitleWithDropdown({
  current,
  list,
  onOpen,
  onSelectItem,
  children,
}: Props) {
  const [dropdownOpened, toggleDropdown] = useState<boolean>(false);

  const dropdownWrapperRef = useRef(null);

  const onCloseDropdown = useCallback(() => {
    toggleDropdown(false);
  }, []);

  const childrenElement = children ? (
    <div className="mt-4">
      <hr className="text-input-grey pb-4" />
      {children}
    </div>
  ) : (
    ""
  );

  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const handleClickTitle = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onOpen(!dropdownOpened);
    return toggleDropdown(!dropdownOpened);
  };

  const selectItem = (value: IKeyValue) => {
    onSelectItem(value);
    onCloseDropdown();
  };

  return (
    <>
      <div className="flex items-center relative z-50" ref={dropdownWrapperRef}>
        <span className="mr-1 cursor-pointer" onClick={handleClickTitle}>
          {current?.name}
        </span>
        <IcArrowDropdown
          className={`text-default transform${
            dropdownOpened ? " rotate-180" : ""
          }`}
        />
        <Dropdown
          opened={dropdownOpened}
          style={{
            minWidth: "284px",
          }}
        >
          <Scrollbar maxHeight="240px">
            <List list={list} current={current} onSelect={selectItem} />
          </Scrollbar>

          {childrenElement}
        </Dropdown>
      </div>
    </>
  );
}

export default TitleWithDropdown;
