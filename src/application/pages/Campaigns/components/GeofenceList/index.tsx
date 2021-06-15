import { Dropdown, FluidLabelInput } from "ui";
import React, {
  KeyboardEvent,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStore } from "effector-react";
import { IKeyValue } from "infrastructure/types";
import { $rowData, getGeofencesList } from "../../models/geofence-list";
import { $currentCompany } from "infrastructure/models/auth/user";
import { useOnClickOutside } from "infrastructure/hooks";
import { useDebouncedCallback } from "use-debounce";
import CheckboxItem from "ui/VirtualList/components/CheckboxItem";
import { $locationItem } from "../../models/location-list";

type Props = {
  field: string;
  onChange: (values: string[]) => void;
  inputRef?: Ref<HTMLInputElement>;
};

function GeofenceList({ field, onChange, inputRef }: Props) {
  const rowData = useStore<IKeyValue[]>($rowData);
  const currentCompany = useStore<IKeyValue | null>($currentCompany);
  const locationItem = useStore<IKeyValue | null>($locationItem);
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

  const loadGeofenceList = (searchValue: string) => {
    getGeofencesList({
      company_id: companyId,
      location_id: locationItem?.name || undefined,
      name: searchValue || undefined,
    });
  };

  const selectItem = (item: IKeyValue) => {
    const selectedCopy = selected ? selected.slice() : [].slice();
    const index = selectedCopy.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (index > -1) {
      selectedCopy.splice(index, 1);
    } else {
      selectedCopy.push(item);
    }
    onChange(selectedCopy.map((item) => item.id));

    select(selectedCopy);
  };

  useEffect(() => {
    if (opened) {
      loadGeofenceList(searchValue);
    }
  }, [opened, searchValue]);

  return (
    <div className="relative z-10" ref={dropdownWrapperRef}>
      <FluidLabelInput
        inputRef={inputRef}
        type="text"
        id={field}
        name={field}
        value={
          selected[0]
            ? `${selected[0].name} ${
                selected.length > 1 ? "+ ещё " + (selected.length - 1) : ""
              }`
            : ""
        }
        placeholder="Выбор геофенсов"
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
        {rowData.map((item, index) => {
          return (
            <div key={index}>
              <CheckboxItem
                item={{
                  ...item,
                  value: item.name,
                }}
                onChangeModel={selectItem}
              />
            </div>
          );
        })}
      </Dropdown>
    </div>
  );
}

export default GeofenceList;
