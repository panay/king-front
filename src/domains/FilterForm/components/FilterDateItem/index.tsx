import React from "react";
import dayjs from "dayjs";
import { Datepicker } from "ui";

type Props = {
  value: Date[];
  onChangeModel: ({
    start_date,
    end_date,
  }: {
    start_date: string;
    end_date: string;
  }) => void;
  maxDate?: Date
};

function FilterDateItem(props: Props) {
  const onChange = (date: Date | Date[]) => {
    const range = date as Date[];
    props.onChangeModel({
      start_date: dayjs(range[0]).format("DD.MM.YYYY"),
      end_date: dayjs(range[1]).format("DD.MM.YYYY"),
    });
  };
  return (
    <Datepicker
      onChange={onChange}
      selectRange={true}
      returnValue="range"
      maxDate={props.maxDate}
    />
  );
}

export default FilterDateItem;
