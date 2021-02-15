import { ButtonHTMLAttributes, ReactElement } from "react";

type Props = ButtonHTMLAttributes<any> & {
  icon: ReactElement;
};

function IconButton({ icon, ...props }: Props) {
  return (
    <button type={props.type || "button"} {...props}>
      {icon}
    </button>
  );
}

export default IconButton;
