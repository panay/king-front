import React, {SyntheticEvent, useState} from "react";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { Tooltip } from "ui";
import FilterItem from "./components/FilterItem";

type Props = {
  fields: {
    key: string;
    type: string;
    title: string;
    data: unknown[];
  }[];
  model: object;
  onFilterChanged: (value: {[fieldKey: string]: object}) => void;
};

function FilterForm(props: Props) {
  const [model, setModel] = useState(props.model);
  const myObj: {[index: string]:any} = model;

  const resetFilter = (event: SyntheticEvent) => {
    debugger;
    event.preventDefault();
    setModel(props.model);
    props.onFilterChanged({})
  };

  const cancel = (fieldKey: string) => {
    debugger;
  };

  const apply = (model: {[fieldKey: string]: object}) => {
    debugger;
    setModel({...props.model, model});
    props.onFilterChanged(model);
  };

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
            model={myObj[field.key]}
            fieldKey={field.key}
            cancelFilter={cancel}
            applyFilter={apply}
          />
        ))}
      </div>
      <button
        onClick={resetFilter}
        className="border-none text-primary cursor-pointer disabled:text-icon-grey"
        disabled={!Object.keys(model as object).length}
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
