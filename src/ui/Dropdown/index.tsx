import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  opened: boolean;
};

function Dropdown({ opened = false, ...props }: Props) {
  return (
    <div
      {...props}
      className={`bg-white absolute rounded-xl p-4 text-default text-sm top-full left-0 shadow-lg mt-2 max-w-full ${
        opened ? "block " : "hidden"
      }`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
