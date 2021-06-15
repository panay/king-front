import { Dropdown, FluidLabelInput, VirtualList } from "ui";
import React, {KeyboardEvent, Ref, RefObject, useCallback, useEffect, useRef, useState} from "react";
import { useStore } from "effector-react";
import { IKeyValue, IPagination } from "infrastructure/types";
import {
  $rowCount,
  $rowData,
  getLocationsList, setCurrentLocation,
  updateLocationListSuccess,
} from "../../models/location-list";
import { $paging } from "infrastructure/models/paging";
import { $currentCompany } from "infrastructure/models/auth/user";
import { useOnClickOutside } from "infrastructure/hooks";
import {useDebouncedCallback} from "use-debounce";

type Props = {
  field: string;
  onChange: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};

function LocationsList({ field, onChange, inputRef }: Props) {
  const rowData = useStore<IKeyValue[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);
  const currentCompany = useStore<IKeyValue | null>($currentCompany);
  const companyId = currentCompany?.id;

  const [searchValue, search] = useState("");
  const [selected, select] = useState<IKeyValue[]>([]);
  const [opened, toggle] = useState(false);

  const dropdownWrapperRef = useRef(null);
  const onCloseDropdown = useCallback(() => {
    toggle(false);
  }, []);

  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const handleKeyDown = (event: KeyboardEvent<unknown>) => {
    if (event.key === "Enter") {
      const ref = inputRef as RefObject<any>;
      search(ref?.current!.value);
    }
  };

  const debouncedSearchEvent = useDebouncedCallback(
      () => search((inputRef as RefObject<any>)?.current!.value),
      400
  );

  const loadLocationList = (searchValue: string, pageNum: number) => {
    if (pageNum === 1) {
      updateLocationListSuccess();
    }

    getLocationsList({
      company_id: companyId,
      page_number: pageNum,
      row_count: paging.perPage,
      name: searchValue || undefined,
    });
  };

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      if (companyId && page > 1) {
        loadLocationList(searchValue, page);
      }

      return null;
    },
    [companyId, loadLocationList, searchValue]
  );

  const selectItem = (item: IKeyValue) => {
    onChange(item.name);
    select([item]);
    setCurrentLocation(item);
  };

  useEffect(() => {
    if (opened) {
      loadLocationList(searchValue, 1);
    }
  }, [opened, searchValue]);

  return (
    <div className="relative z-10" ref={dropdownWrapperRef}>
      <FluidLabelInput
        inputRef={inputRef}
        type="text"
        id={field}
        name={field}
        value={selected[0]?.id || ''}
        placeholder="Местоположение"
        onChange={debouncedSearchEvent}
        onKeyDown={handleKeyDown}
        onFocus={() => toggle(true)}
      />
      <Dropdown
        opened={opened}
        style={{
          minWidth: "284px",
          maxWidth: "300px",
        }}
      >
        <VirtualList
          loadNextPage={loadNextPage}
          items={rowData}
          type="radio"
          rowCount={rowCount}
          selectedValues={selected}
          onChangeModel={selectItem}
        />
      </Dropdown>
    </div>
  );
}

export default LocationsList;
