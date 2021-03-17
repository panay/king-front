import React, { ReactElement } from "react";
import Select, { components, NamedProps, Props, Theme } from "react-select";
import { ReactComponent as IcArrowDropdown } from "infrastructure/assets/images/svgs/ic-arrow-dropdown.svg";

type P = Props & NamedProps;

const DropdownIndicator = (props: any): ReactElement => {
  return (
    <components.DropdownIndicator {...props}>
      <IcArrowDropdown />
    </components.DropdownIndicator>
  );
};

const IndicatorSeparator = () => null;

function CustomSelect({ ...props }: P) {
  const theme = (theme: Theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
      ...theme.colors,
      text: "#181818",
      primary25: "#4b87df",
      primary: "#0052cc",
    },
  });

  return (
    <>
      <Select
        {...props}
        theme={theme}
        components={{
          DropdownIndicator,
          IndicatorSeparator,
        }}
      />
    </>
  );
}

export default CustomSelect;
