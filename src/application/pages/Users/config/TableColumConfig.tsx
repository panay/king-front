import { Column } from "react-table";
import React, { useMemo } from "react";

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "name",
        width: 240,
      },
      {
        Header: "Роль",
        accessor: "role",
        width: 160,
        Cell: (props: any) => {
          return <span>{props.value?.name}</span>;
        },
      },
      {
        Header: "Почта",
        accessor: "login",
        width: 180,
        Cell: (props: any) => {
          return (
            <span className="block max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
              {props.value}
            </span>
          );
        },
      },
      {
        Header: "Признак активности",
        accessor: "is_active",
        Cell: (props: any) => {
          return (
            <span
              className={`text-xs bg-opacity-20 text-center px-2 py-1 rounded ${
                props.value
                  ? "bg-seagreen text-seagreen"
                  : "bg-warning text-warning"
              }`}
            >
              {props.value ? "Активен" : "Не активен"}
            </span>
          );
        },
      },
    ],
    []
  );
};

export { TableColumnConfig };
