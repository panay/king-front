import React, { SyntheticEvent, useCallback, useRef, useState } from "react";
import { ReactComponent as IcArrowDropdown } from "infrastructure/assets/images/svgs/ic-arrow-dropdown.svg";
import { IKeyValue } from "infrastructure/types";
import { useOnClickOutside } from "infrastructure/hooks";

type Props = {
  caption: string;
  name: string;
  list: IKeyValue[];
  onSelectItem: (item: IKeyValue) => void;
};

function TitleWithDropdown({ caption, name, list, onSelectItem }: Props) {
  const [dropdownOpened, toggleDropdown] = useState(false);
  const dropdownWrapperRef = useRef(null);
  const onCloseDropdown = useCallback(() => {
    toggleDropdown((_) => false);
  }, []);

  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const handleClickTitle = (event: SyntheticEvent) => {
    event.preventDefault();
    toggleDropdown((opened) => !opened);
  };

  const selectItem = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const value: IKeyValue = {
      id: event.currentTarget.id,
      name: event.currentTarget.textContent!.toString(),
    };
    onSelectItem(value);
    onCloseDropdown();
  };

  return (
    <>
      <div className="text-xs text-icon-grey font-normal">{caption}</div>
      <div
        className="flex items-center relative z-50"
        onClick={handleClickTitle}
        ref={dropdownWrapperRef}
      >
        <span className="mr-1 cursor-pointer">{name}</span>
        <IcArrowDropdown className="text-default" />

        <ul
          className={`bg-white absolute rounded-xl p-4 text-default top-full left-0 shadow-xl mt-2 max-w-full ${
            dropdownOpened ? "block " : "hidden"
          }`}
          style={{
            minWidth: "240px",
          }}
        >
          {list.map((item, index) => (
            <li
              className="text-default text-base mt-2 font-normal cursor-pointer hover:text-dusty-orange"
              key={index}
              id={item.id}
              onClick={selectItem}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TitleWithDropdown;
