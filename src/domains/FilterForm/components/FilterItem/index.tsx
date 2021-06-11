import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Dropdown, Scrollbar, VirtualList } from "ui";
import { useOnClickOutside } from "infrastructure/hooks";
import RadioItem from "ui/VirtualList/components/RadioItem";
import CheckboxItem from "ui/VirtualList/components/CheckboxItem";
import { BgTypeEnum } from "ui/Button";
import { ICheckbox, IKeyValue, IRadio } from "infrastructure/types";
import FilterDateItem from "../FilterDateItem";

type Props = {
  title: string;
  type: string;
  data: unknown[];
  model: any;
  fieldKey: string;
  onDropdownOpened: (opened: boolean) => void;
  cancelFilter: (key: string) => void;
  applyFilter: (model: { [key: string]: unknown }) => void;
  virtualListProps?: {
    loadNextPage: (
      startIndex: number,
      stopIndex: number,
      page: number
    ) => Promise<any> | null;
    rowCount: number;
    type: string;
  };
  onSearch?: (value: string) => void;
};

function FilterItem(props: Props) {
  const [dropdownOpened, toggleDropdown] = useState<boolean>(false);
  const [selected, select] = useState<IKeyValue[]>([]);
  const [dateSelected, selectDate] = useState<string[]>([]);

  const dropdownWrapperRef = useRef(null);

  const onCloseDropdown = useCallback(() => {
    props.onDropdownOpened(false);
    toggleDropdown(false);
  }, [props]);

  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    props.onDropdownOpened(!dropdownOpened);
    return toggleDropdown(!dropdownOpened);
  };

  const switchTypeForm = useCallback((): ReactElement[] | ReactElement => {
    const handleChangeFilter = (item: IKeyValue) => {
      const selectedCopy = selected ? selected.slice() : [].slice();

      const type = props.virtualListProps?.type || props.type;

      switch (type) {
        case "radio-dropdown":
        case "radio": {
          const index = selectedCopy.findIndex(
            (selectedItem) => selectedItem.name === item.name
          );

          if (index > -1) {
            selectedCopy.splice(index, 1, item);
          } else {
            selectedCopy.push(item);
          }

          break;
        }
        case "checkbox-dropdown":
        case "checkbox": {
          const index = selectedCopy.findIndex(
            (selectedItem) => selectedItem.id === item.id
          );

          if (index > -1) {
            selectedCopy.splice(index, 1);
          } else {
            selectedCopy.push(item);
          }

          break;
        }
      }

      select(selectedCopy);
    };

    const handleChangeDateFilter = ({
      start_date,
      end_date,
    }: {
      start_date: string;
      end_date: string;
    }) => {
      selectDate([start_date, end_date]);
    };

    switch (props.type) {
      case "radio-dropdown": {
        return props.data.map((item, index) => (
          <RadioItem
            key={index}
            selected={
              selected?.find((s) => s.id === (item as IRadio).value) ||
              undefined
            }
            item={item as IRadio}
            onChangeModel={handleChangeFilter}
          />
        ));
      }
      case "checkbox-dropdown": {
        return props.data.map((item, index) => (
          <CheckboxItem
            key={index}
            selected={
              selected?.find((s) => s.id === (item as ICheckbox).id) ||
              undefined
            }
            item={item as ICheckbox}
            onChangeModel={handleChangeFilter}
          />
        ));
      }
      case "virtual-list": {
        if (props.virtualListProps) {
          return (
            <VirtualList
              items={props.data as IKeyValue[]}
              {...props.virtualListProps}
              selectedValues={selected}
              onSearch={props.onSearch}
              reload={!dropdownOpened}
              searchInside={true}
              onChangeModel={handleChangeFilter}
            />
          );
        }
        return <></>;
      }
      case "date": {
        return (
          <FilterDateItem
            value={(props.data as Date[]) || dateSelected}
            onChangeModel={handleChangeDateFilter}
            maxDate={new Date()}
          />
        );
      }
    }

    return <></>;
  }, [props.data, props.type, selected]);

  const filterCount =
    props.model?.length && props.type !== "date" ? (
      <span className="absolute top-1/2 -right-6 z-10 bg-warning text-white font-normal text-xs text-center rounded-full p-1 w-5 h-5 flex flex-col items-center justify-center transform -translate-y-1/2">
        {props.model?.length}
      </span>
    ) : (
      <></>
    );

  const cancel = () => {
    debugger;
    props.cancelFilter(props.fieldKey);
    toggleDropdown(false);
  };

  const apply = () => {
    if (props.type === "date") {
      props.applyFilter({ [props.fieldKey]: dateSelected });
    } else {
      props.applyFilter({ [props.fieldKey]: selected });
    }
    toggleDropdown(false);
  };

  useEffect(() => {
    select(props.model);
  }, [props.model]);

  return (
    <span
      className="relative mr-10 z-50 font-semibold cursor-pointer text-primary border-b border-dashed border-hover-primary hover:border-transparent hover:text-default"
      ref={dropdownWrapperRef}
    >
      <span onClick={handleClick}>
        {props.type === "date" && props.model?.length
          ? `${props.model[0]}–${props.model[1]}`
          : props.title}
      </span>
      {filterCount}
      <Dropdown
        opened={dropdownOpened}
        style={{
          minWidth: "284px",
          maxWidth: "300px",
        }}
      >
        <Scrollbar maxHeight="240px">{switchTypeForm()}</Scrollbar>

        <div className="flex items-center -mx-2.5 mt-2">
          <div className="mx-2.5 flex-auto">
            <Button
              value="Отменить"
              type="button"
              bgType={BgTypeEnum.secondary}
              className="w-full"
              onButtonClick={cancel}
            />
          </div>
          <div className="mx-2.5 flex-auto">
            <Button
              value="Применить"
              type="button"
              bgType={BgTypeEnum.primary}
              className="w-full"
              onButtonClick={apply}
            />
          </div>
        </div>
      </Dropdown>
    </span>
  );
}

export default FilterItem;
