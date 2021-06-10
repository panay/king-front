import { Dropdown, FluidLabelInput, VirtualList } from "ui";
import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "effector-react";
import { IKeyValue, IPagination } from "infrastructure/types";
import {
  $rowCount,
  $rowData,
  getLocationsList,
  updateLocationListSuccess,
} from "../../models/location-list";
import { $paging } from "infrastructure/models/paging";
import { $currentCompany } from "infrastructure/models/auth/user";
import { useOnClickOutside } from "infrastructure/hooks";

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

  const [selected, select] = useState<IKeyValue[]>([]);
  const [opened, toggle] = useState(false);
  const dropdownWrapperRef = useRef(null);
  const onCloseDropdown = useCallback(() => {
    toggle(false);
  }, []);
  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const loadLocationList = (pageNum: number) => {
    if (pageNum === 1) {
      updateLocationListSuccess();
    }

    getLocationsList({
      company_id: companyId,
      page_number: pageNum,
      row_count: paging.perPage,
      name: undefined,
    });
  };

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      if (companyId && page > 1) {
        loadLocationList(page);
      }

      return null;
    },
    [companyId, loadLocationList]
  );

  const selectItem = (item: IKeyValue) => {
    onChange(item.id)
    select([item]);
  };

  useEffect(() => {
    if (opened) {
      loadLocationList(1);
    }
  }, [opened]);

  return (
    <div className="relative z-10" ref={dropdownWrapperRef}>
      <FluidLabelInput
        inputRef={inputRef}
        type="text"
        id={field}
        name={field}
        placeholder="Местоположение"
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
          searchInside={false}
          onChangeModel={selectItem}
        />
      </Dropdown>
    </div>
  );
}

export default LocationsList;
