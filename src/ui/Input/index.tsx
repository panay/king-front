import React, { InputHTMLAttributes, Ref } from "react";

type Props = InputHTMLAttributes<unknown> & {
  inputRef?: Ref<HTMLInputElement>;
};

function Input({ inputRef, ...props }: Props) {
  return (
    <input
      ref={inputRef}
      {...props}
      className={`py-1.5 px-3 bg-input-grey rounded-lg placeholder-icon-grey text-default text-sm focus:outline-none ${props.className}`}
    />
  );
}

export default Input;
