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
        Header: () => <div className="text-center">Геофенс</div>,
        accessor: "geofence_count",
        maxWidth: 100,
        Cell: (row) => <span className="text-center">{row.value}</span>,
      },
      {
        Header: () => <div className="text-center">Кампании</div>,
        accessor: "campaign_count",
        maxWidth: 100,
        Cell: (row) => <span className="text-center">{row.value}</span>,
      },
    ],
    []
  );
};

export { TableColumnConfig };
