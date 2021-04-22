import { Column } from "react-table";
import React, { useMemo } from "react";
import { ReactComponent as IcAndroid } from "infrastructure/assets/images/svgs/ic-android.svg";
import { ReactComponent as IcApple } from "infrastructure/assets/images/svgs/ic-apple.svg";
import { ReactComponent as IcPauseTimer } from "infrastructure/assets/images/svgs/ic-pausetimer.svg";
import { ReactComponent as IcPlayTimer } from "infrastructure/assets/images/svgs/ic-playtimer.svg";
import { Tag } from "ui";
import dayjs from "dayjs";
import { togglePause } from "../models/table";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const TableColumnConfig = (): Array<Column<any>> => {
  return useMemo(
    () => [
      {
        Header: "Название и срок действия кампании",
        accessor: "name",
        maxWidth: 400,
        Cell: (row) => {
          const platforms = row.row.original.platforms.split(",") || [];
          const state = row.row.original.state;
          const period = row.row.original.period;
          const actingState = state === "ACTING";
          const pendingState = state === "PENDING";
          const completedState = state === "COMPLETED";
          const pauseState =
            state === "ACTING_SUSPENDED" || state === "PENDING_SUSPENDED";

          const startDate = dayjs(period.start_date, "DD.MM.YYYY,HH:mm");
          const endDate = dayjs(period.end_date, "DD.MM.YYYY,HH:mm");
          const showYear: boolean = startDate.diff(endDate, "year") !== 0;

          const trimString = (value: string): string => {
            return value && value.length > 40
              ? value.substr(0, 40).concat("...")
              : value;
          };

          const pause = (paused: boolean) => {
            togglePause({ campaign_id: row.row.original.id, paused: paused });
          };

          const pauseButton =
            actingState || pendingState ? (
              <button
                className="invisible flex items-center border-none text-xs text-primary hover:text-hover-primary group-hover:visible"
                onClick={(event) => pause(true)}
              >
                <IcPauseTimer className="mr-1" />
                Поставить на паузу
              </button>
            ) : pauseState ? (
              <button
                className="invisible flex items-center border-none text-xs text-primary hover:text-hover-primary group-hover:visible"
                onClick={(event) => pause(false)}
              >
                <IcPlayTimer className="mr-1" />
                Снять с паузы
              </button>
            ) : (
              <></>
            );

          return (
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center mb-1.5">
                <Tag
                  className="mr-2"
                  bg={
                    actingState
                      ? "tag-green"
                      : completedState
                      ? "tag-red"
                      : pauseState
                      ? "off-white"
                      : "tag-grey"
                  }
                  color={
                    actingState
                      ? "seagreen"
                      : completedState
                      ? "tag-text-red"
                      : pauseState
                      ? "brown"
                      : "tag-text-grey"
                  }
                  text={
                    actingState
                      ? "Активный"
                      : completedState
                      ? "Завершена"
                      : pauseState
                      ? "Пауза"
                      : "Ожидание"
                  }
                />
                <span className="text-icon-grey text-xs">
                  {startDate.format(showYear ? "DD.MM.YY" : "DD.MM")}-
                  {endDate.format("DD.MM.YYYY")}
                </span>
              </div>
              <h2 className="leading-5 mb-1.5 group-hover:text-primary" title={row.value}>
                {trimString(row.value)}
              </h2>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {platforms.map((app: string, index: number) =>
                    app === "IOS" ? (
                      <IcApple key={index} className="mr-2" />
                    ) : (
                      <IcAndroid key={index} />
                    )
                  )}
                </div>

                {pauseButton}
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
