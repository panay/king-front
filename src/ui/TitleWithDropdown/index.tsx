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

type Props = {
  name: IKeyValue;
  list: IKeyValue[];
  onOpen: (opened: boolean) => void;
  onSelectItem: (item: IKeyValue) => void;
  children?: ReactElement;
};

function TitleWithDropdown({
  name,
  list,
  onOpen,
  onSelectItem,
  children,
}: Props) {
  const [dropdownOpened, toggleDropdown] = useState<boolean>(false);
  const [selected, selectListItem] = useState<string>(name?.id);

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

  const selectItem = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const value: IKeyValue = {
      id: event.currentTarget.id,
      name: event.currentTarget.textContent!.toString(),
    };
    onSelectItem(value);
    selectListItem(value.id);
    onCloseDropdown();
  };

  return (
    <>
      <div className="flex items-center relative z-50" ref={dropdownWrapperRef}>
        <span className="mr-1 cursor-pointer" onClick={handleClickTitle}>
          {name?.name}
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
          {list.map((item, index) => (
            <div
              className={`text-primary text-sm mt-2 font-semibold cursor-pointer hover:text-hover-primary${
                selected === item.id ? " text-default pointer-events-none" : ""
              }`}
              key={index}
              id={item.id}
              onClick={selectItem}
            >
              {item.name}
            </div>
          ))}

          {childrenElement}
        </Dropdown>
      </div>
    </>
  );
}

export default TitleWithDropdown;
