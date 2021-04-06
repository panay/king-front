import { Column } from "react-table";
import React, { useMemo } from "react";

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "name",
        width: 300,
      },
      {
        Header: "Геофенс",
        accessor: "geofence",
        width: 100,
      },
      {
        Header: "Кампании",
        accessor: "campaigns",
        width: 200,
      },
    ],
    []
  );
};

export { TableColumnConfig };
