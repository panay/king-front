import { Column } from "react-table";
import { useMemo } from "react";

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "name",
        maxWidth: 400,
      },
      {
        Header: () => <div className="mx-auto">Геофенс</div>,
        accessor: "geofence_count",
        maxWidth: 100,
        Cell: (row) => <div className="mx-auto text-center">{row.value}</div>,
      },
      {
        Header: () => <div className="mx-auto">Кампании</div>,
        accessor: "campaign_count",
        maxWidth: 100,
        Cell: (row) => <div className="mx-auto text-center">{row.value}</div>,
      },
    ],
    []
  );
};

export { TableColumnConfig };
