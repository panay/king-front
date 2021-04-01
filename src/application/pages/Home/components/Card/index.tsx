import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

type Props = {
  icon: ReactElement;
  color: string;
  title: string;
  growth: string;
  to: string;
  totalAmount?: string;
  graphIcon?: ReactElement;
};

function Card({
  icon,
  color,
  title,
  growth,
  to,
  totalAmount,
  graphIcon,
}: Props) {
  const bgColor = `bg-${color}`;
  const textColor = `text-${color}`;
  const firstClassName = `p-3 rounded-xl bg-opacity-20 ${bgColor} ${textColor}`;
  const secondClassName = `shadow w-14 h-0.5 ${bgColor}`;

  return (
    <Link
      to={to}
      className={`group block p-4 bg-white rounded-xl transition-shadow hover:shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className={firstClassName}>{icon}</div>
        <div className="text-right">
          {growth === "0%" ? <div className={secondClassName} /> : graphIcon}
          <p className="text-xs text-icon-grey mt-1.5">{growth}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-default">{title}</h3>
        <p className="text-xs text-icon-grey group-hover:hidden">
          {totalAmount || "Нет использованных"}
        </p>
        <p className="text-xs hidden text-hover-primary group-hover:block">
          Добавить запись
        </p>
      </div>
    </Link>
  );
}

export default Card;
