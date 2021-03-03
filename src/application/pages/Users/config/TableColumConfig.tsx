import { Column } from "react-table";
import React, { useMemo } from "react";

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "userName",
      },
      {
        Header: "Роль",
        accessor: "userRole",
      },
      {
        Header: "Почта",
        accessor: "email",
      },
      {
        Header: "Признак активности",
        accessor: "isActive",
        Cell: (props) => {
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
