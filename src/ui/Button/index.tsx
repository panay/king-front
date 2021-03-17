import React, {
  ButtonHTMLAttributes,
  ReactElement,
  SyntheticEvent,
} from "react";
import InputButton from "./InputButton";
import IconButton from "./IconButton";

export enum BgTypeEnum {
  primary,
  success,
  warning,
  secondary,
}

type Props = ButtonHTMLAttributes<any> & {
  onButtonClick?: () => void;
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
      return "bg-warning hover:bg-hover-warning active:bg-active-warning";
    case BgTypeEnum.secondary:
      return "bg-input-grey text-primary hover:bg-border-grey active:bg-icon-grey";
    default:
      return "bg-primary hover:bg-hover-primary active:bg-active-primary";
  }
}

function Button({
  icon,
  onButtonClick,
  bgType = BgTypeEnum.primary,
  ...props
}: Props) {
  const className =
    "flex items-center justify-center max-w-full font-semibold text-center rounded-lg cursor-pointer outline-none focus:outline-none text-white disabled:bg-icon-grey disabled:text-white disabled:pointer-events-none";
  let bgTypeClassName = setBgType(bgType);

  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return icon ? (
    <IconButton
      icon={icon}
      {...props}
      onClick={handleOnClick}
      className={`${className} ${bgTypeClassName} px-2 py-2 ${props.className}`}
    />
  ) : (
    <InputButton
      {...props}
      onClick={handleOnClick}
      className={`${className} ${bgTypeClassName} px-4 py-3 ${props.className}`}
    />
  );
}

export default Button;
