import React, { Ref, useCallback, useRef, useState } from "react";
import { Datepicker, Dropdown, FluidLabelInput } from "ui";
import dayjs from "dayjs";
import { useOnClickOutside } from "infrastructure/hooks";

type Props = {
  field: string;
  placeholder: string;
  onChange: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};

function PeriodDatepicker({ field, placeholder, onChange, inputRef }: Props) {
  const [opened, toggle] = useState(false);
  const dropdownWrapperRef = useRef(null);
  const onCloseDropdown = useCallback(() => {
    toggle(false);
  }, []);
  useOnClickOutside(dropdownWrapperRef, onCloseDropdown);
  return (
    <div ref={dropdownWrapperRef}>
      <FluidLabelInput
        inputRef={inputRef}
        type="text"
        id={field}
        name={field}
        placeholder={placeholder}
        required
        onFocus={() => toggle(true)}
      />
      <Dropdown
        opened={opened}
        style={{
          minWidth: "284px",
          maxWidth: "300px",
        }}
      >
        <Datepicker
          onChange={(e) => {
            toggle(false);
            onChange(dayjs(e as Date).format("DD.MM.YYYY"));
          }}
          selectRange={false}
          returnValue="start"
        />
      </Dropdown>
    </div>
  );
}

export default PeriodDatepicker;
