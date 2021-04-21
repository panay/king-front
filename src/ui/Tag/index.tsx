import React, { HTMLAttributes } from "react";

type Props = HTMLAttributes<unknown> & {
  bg: string;
  color: string;
  text: string;
};

function Tag({ bg, color, text, ...props }: Props) {
  return (
    <span
      {...props}
      className={`text-xs text-center px-2 py-1 rounded ${"bg-" + bg} ${
        "text-" + color
      } ${props.className}`}
    >
      {text}
    </span>
  );
}

export default Tag;
