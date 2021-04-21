import { Column } from "react-table";
import { useMemo } from "react";
import { ReactComponent as IcAndroid } from "infrastructure/assets/images/svgs/ic-android.svg";
import { ReactComponent as IcApple } from "infrastructure/assets/images/svgs/ic-apple.svg";

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Название и срок действия кампании",
        accessor: "name",
        maxWidth: 400,
        Cell: (row) => {
          // console.log(row.row.original);
          const platforms = row.row.original.platforms.split(",") || [];
          const state = row.row.original.state;
          const period = row.row.original.period;
          return (
            <div>
                <div className="flex items-center">
                    <span>{state === "ACTING" ? "Активный" : state === "COMPLETED" ? "Закончено" : "Ожидание"}</span>
                    <span>{period.start_date}-{period.end_date}</span>
                </div>
              <h2>{row.value}</h2>
              <div className="flex items-center">
                {platforms.map((app: string, index: number) =>
                  app === "IOS" ? <IcApple key={index} className="mr-2" /> : <IcAndroid key={index} />
                )}
              </div>
            </div>
          );
        },
      },
      {
        Header: "Местоположение",
        accessor: "location",
        maxWidth: 250,
        Cell: (row) => <span>{row.value?.name}</span>,
      },
      {
        Header: () => <div className="mx-auto">Геофенсы</div>,
        accessor: "geofence_count",
        maxWidth: 100,
        Cell: (row) => <div className="mx-auto text-center">{row.value}</div>,
      },
      {
        Header: () => <div className="mx-auto">Уведом.</div>,
        accessor: "max_notify_count_per_day",
        maxWidth: 100,
        Cell: (row) => <div className="mx-auto text-center">{row.value}</div>,
      },
    ],
    []
  );
};

export { TableColumnConfig };
