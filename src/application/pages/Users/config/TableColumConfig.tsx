import { Column } from "react-table";
import React, { useMemo } from "react";
import { Tag } from "ui";

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
            <Tag
              className="bg-opacity-20"
              bg={props.value ? "seagreen" : "warning"}
              color={props.value ? "seagreen" : "warning"}
              text={props.value ? "Активен" : "Не активен"}
            />
          );
        },
      },
    ],
    []
  );
};

export { TableColumnConfig };
