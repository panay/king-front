import React, { ButtonHTMLAttributes, ReactElement } from "react";
import InputButton from "./InputButton";
import IconButton from "./IconButton";

export enum BgTypeEnum {
  primary,
  success,
  warning,
}

type Props = ButtonHTMLAttributes<any> & {
  onClick?: () => void;
  icon?: ReactElement;
  bgType?: BgTypeEnum;
};

function setBgType(bgType: BgTypeEnum): string {
  switch (bgType) {
    case BgTypeEnum.primary:
      return "bg-primary hover:bg-hover-primary active:bg-active-primary";
    case BgTypeEnum.success:
      return "bg-success hover:bg-hover-success active:bg-active-success";
    case BgTypeEnum.warning:
      return "bg-success hover:bg-hover-success active:bg-active-success";
    default:
      return "bg-primary hover:bg-hover-primary active:bg-active-primary";
  }
}

function Button({
  icon,
  onClick,
  bgType = BgTypeEnum.primary,
  ...props
}: Props) {
  const className =
    "flex items-center justify-center max-w-full font-bold text-center rounded-lg cursor-pointer outline-none focus:outline-none text-white disabled:bg-icon-grey disabled:pointer-events-none";
  let bgTypeClassName = setBgType(bgType);

  return icon ? (
    <IconButton
      icon={icon}
      {...props}
      onClick={onClick}
      className={`${className} ${bgTypeClassName} px-2 py-2 ${props.className}`}
    />
  ) : (
    <InputButton
      {...props}
      onClick={onClick}
      className={`${className} ${bgTypeClassName} px-4 py-3 ${props.className}`}
    />
  );
}

export default Button;
