import React, { SyntheticEvent, useEffect } from "react";
import "./models/init";
import { useStore } from "effector-react";
import { $model, $modelIsChanged, setModel } from "./models";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { Tooltip } from "ui";
import FilterItem from "./components/FilterItem";

type Props = {
  fields: {
    key: string;
    type: string;
    title: string;
    data: unknown[];
    onSearch?: (value: string) => void;
    onDropdownOpened?: (opened: boolean) => void;
    virtualListProps?: {
      loadNextPage: (
        startIndex: number,
        stopIndex: number,
        page: number
      ) => Promise<any> | null;
      rowCount: number;
      type: string;
    };
  }[];
  model: { [key: string]: unknown };
  onFilterChanged: (value: { [key: string]: unknown }) => void;
};

function FilterForm(props: Props) {
  const modelStore = useStore($model);
  const modelIsChanged = useStore($modelIsChanged);

  const resetFilter = (event: SyntheticEvent) => {
    debugger;
    event.preventDefault();
    setModel(props.model);
    props.onFilterChanged({});
  };

  const cancel = (key: string) => {
    const value = modelStore[key];
    debugger;
  };

  const apply = (model: { [key: string]: unknown }) => {
    const m = { ...modelStore, ...model };

    setModel(m);
    props.onFilterChanged(m);
  };

  useEffect(() => {
    setModel(props.model);
  }, [props.model]);

  return (
    <div className="bg-lighten-grey border border-input-grey rounded-xl p-3 flex justify-between">
      <div className="flex">
        <span className="font-bold mr-2">Фильтр:</span>
        {props.fields.map((field, index) => (
          <FilterItem
            key={index}
            type={field.type}
            title={field.title}
            data={field.data}
            model={modelStore[field.key]}
            fieldKey={field.key}
            onSearch={field.onSearch ? field.onSearch : () => {}}
            onDropdownOpened={
              field.onDropdownOpened ? field.onDropdownOpened : () => {}
            }
            virtualListProps={field.virtualListProps}
            cancelFilter={cancel}
            applyFilter={apply}
          />
        ))}
      </div>
      <button
        onClick={resetFilter}
        className="border-none text-primary cursor-pointer disabled:text-icon-grey"
        disabled={!modelIsChanged}
        data-tip="Сбросить фильтр"
        data-for="reset-filter-tooltip"
      >
        <IcRefresh />
        <Tooltip id="reset-filter-tooltip" place="bottom" />
      </button>
    </div>
  );
}

export default FilterForm;
