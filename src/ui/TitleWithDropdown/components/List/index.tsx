import React, { SyntheticEvent, useState } from "react";
import { IKeyValue } from "infrastructure/types";

type Props = {
  list: IKeyValue[];
  current: IKeyValue;
  onSelect: (item: IKeyValue) => void;
};

function List({ list, current, onSelect }: Props) {
  const [selected, selectListItem] = useState<string>(current?.id);
  const onSelectHandler = (event: SyntheticEvent) => {
    const value: IKeyValue = {
      id: event.currentTarget.id,
      name: event.currentTarget.textContent!.toString(),
    };
    onSelect(value);
    selectListItem(value.id);
  };
  return (
    <>
      {list.map((item, index) => (
        <div
          className={`text-primary text-sm mt-2 font-semibold cursor-pointer hover:text-hover-primary${
            selected === item.id ? " text-default pointer-events-none" : ""
          }`}
          key={index}
          id={item.id}
          onClick={onSelectHandler}
        >
          {item.name}
        </div>
      ))}
    </>
  );
}

export default List;
