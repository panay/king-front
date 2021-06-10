import React, { useEffect, useState } from "react";
import { ICheckbox, IKeyValue } from "infrastructure/types";
import { Checkbox } from "ui";

type Props = {
  item: ICheckbox;
  selected?: IKeyValue;
  onChangeModel: (value: IKeyValue) => unknown;
};

function CheckboxItem(props: Props) {
  const [selected, select] = useState<IKeyValue>();

  const selectItem = (input: HTMLInputElement) => {
    const item: IKeyValue = {
      id: input.id,
      name: input.value,
    };

    if (selected && item.id === selected.id) {
      select({} as IKeyValue);
    } else {
      select(item);
    }

    props.onChangeModel(item);
  };

  useEffect(() => {
    if (props.selected) {
      select(props.selected);
    }
  }, [props.selected]);

  return (
    <div className="mb-2.5">
      <Checkbox
        id={props.item.id}
        name={props.item.name}
        value={props.item.value}
        checked={selected?.id === props.item.id}
        onInputChange={selectItem}
      />
    </div>
  );
}

export default CheckboxItem;
