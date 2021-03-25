import React, { ReactElement } from "react";
import Select, { components, NamedProps, Props } from "react-select";
import { ReactComponent as IcArrowDropdown } from "infrastructure/assets/images/svgs/ic-arrow-dropdown.svg";

type P = Props & NamedProps;

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
      };
    },
  };

  return (
    <>
      <Select
        {...props}
        styles={colourStyles}
        components={{
          DropdownIndicator,
          IndicatorSeparator,
        }}
      />
    </>
  );
}

export default CustomSelect;
