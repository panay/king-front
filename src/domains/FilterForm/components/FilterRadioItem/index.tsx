import React, {useEffect, useState} from "react";
import { IKeyValue, IRadio } from "infrastructure/types";
import { Radio } from "ui";

type Props = {
  item: IRadio;
  selected?: IKeyValue;
  onChangeModel: (value: IKeyValue) => unknown;
};

function FilterRadioItem(props: Props) {
  const [selected, select] = useState<IKeyValue>();

  const selectItem = (input: HTMLInputElement) => {
    const item: IKeyValue = {
      id: input.value,
      name: input.name,
    };

    select(item);
    props.onChangeModel(item);
  };

  useEffect(() => {
    select({} as IKeyValue);

    setTimeout(() => {
      select(props.selected);
    });
  }, [props.selected])

  return (
    <div className="mb-2.5">
      <Radio
        name={props.item.name}
        value={props.item.value}
        checked={selected?.id === props.item.value}
        onInputChange={selectItem}
      />
    </div>
  );
}

export default FilterRadioItem;
