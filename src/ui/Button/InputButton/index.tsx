import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<any>;

function InputButton({ ...props }: Props) {
  return (
    <input type={props.type || "button"} {...props} />
  );
}

export default InputButton;
