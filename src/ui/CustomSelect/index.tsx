import React, { ReactElement, Ref } from "react";
import Select, { components, NamedProps, Props } from "react-select";
import { ReactComponent as IcArrowDropdown } from "infrastructure/assets/images/svgs/ic-arrow-dropdown.svg";

type P = Props & NamedProps & {
  inputRef?: Ref<Select>;
}

const DropdownIndicator = (props: any): ReactElement => {
  return (
    <components.DropdownIndicator {...props}>
      <IcArrowDropdown className="text-default" />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = () => null;

function CustomSelect({ ...props }: P) {
  const colourStyles = {
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: null,
      color: isFocused ? "#0049b5" : isSelected ? "#181818" : "#181818",
      cursor: "pointer",
    }),
    control: (base: any, { isFocused, menuIsOpen }: any) => {
      return {
        ...base,
        background: menuIsOpen ? "#ffffff" : "#f4f4f6",
        borderRadius: 12,
        borderColor: isFocused ? "#f4f4f6" : "#f4f4f6",
        boxShadow: isFocused ? null : null,
        "&:hover": {
          borderColor: isFocused ? "#ebecf0" : "#f4f4f6",
        },
        fontSize: 12,
      };
    },
    placeholder: (base: any) => {
      return {
        ...base,
        color: "#8f92a1",
      };
    },
    multiValue: (base: any) => {
      return {
        ...base,
        background: "#4b87df",
        color: "#ffffff",
        borderRadius: 6,
        padding: 2,
      };
    },
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#ffffff",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#ffffff",
      ":hover": {
        backgroundColor: "",
        color: "#0052cc",
      },
    }),
  };

  return (
    <>
      <Select
        {...props}
          ref={props.inputRef}
        styles={colourStyles}
        isMulti={props.isMulti}
        components={{
          DropdownIndicator,
          IndicatorSeparator,
        }}
      />
    </>
  );
}

export default CustomSelect;
