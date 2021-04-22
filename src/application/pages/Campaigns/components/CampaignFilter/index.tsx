import React, { SyntheticEvent, useCallback, useRef, useState } from "react";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { Tooltip, Dropdown, Scrollbar } from "ui";
import { useOnClickOutside } from "infrastructure/hooks";

type Props = {
  changeModel?: (value: unknown) => void;
};

function CampaignFilter({ changeModel }: Props) {
  const defaultModel = {
    location: null,
    platforms: null,
    period: null,
    state: null,
  };
  const [model, setModel] = useState({});
  const [dropdownOpened, toggleDropdown] = useState<boolean>(false);

  const dropdownWrapperRef = useRef(null);

  const onCloseDropdown = useCallback(() => {
    toggleDropdown(false);
  }, []);

  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    return toggleDropdown(!dropdownOpened);
  };

  const resetFilter = (event: SyntheticEvent) => {
    event.preventDefault();
    setModel({});
  };

  const selectItem = (value: unknown) => {
    if (changeModel) {
      changeModel(value);
    }
    onCloseDropdown();
  };

  return (
    <div className="bg-lighten-grey border border-input-grey rounded-xl p-3 flex justify-between">
      <div className="flex" ref={dropdownWrapperRef}>
        <strong className="font-bold mr-2">Фильтр:</strong>
        <span
          onClick={handleClick}
          className="relative z-50 font-semibold cursor-pointer text-primary border-b border-dashed border-hover-primary mr-10 hover:border-transparent hover:text-default"
        >
          Местоположение
        </span>
        <span
          onClick={handleClick}
          className="relative z-50 font-semibold cursor-pointer text-primary border-b border-dashed border-hover-primary hover:border-transparent hover:text-default"
        >
          Моб.платформа
          <Dropdown
            opened={dropdownOpened}
            style={{
              minWidth: "284px",
              maxWidth: "300px",
            }}
          >
            <Scrollbar maxHeight="240px">
              <ul>
                <li>IOS</li>
                <li>Android</li>
              </ul>
            </Scrollbar>
          </Dropdown>
        </span>
      </div>
      <button
        onClick={resetFilter}
        className="border-none text-primary cursor-pointer disabled:text-icon-grey"
        disabled={!Object.keys(model).length}
        data-tip="Сбросить фильтр"
        data-for="reset-filter-tooltip"
      >
        <IcRefresh />
        <Tooltip id="reset-filter-tooltip" place="bottom" />
      </button>
    </div>
  );
}

export default CampaignFilter;
