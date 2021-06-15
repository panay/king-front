import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FilterForm } from "domains";
import { IKeyValue, IPagination } from "infrastructure/types";
import { useStore } from "effector-react";
import { $paging } from "infrastructure/models/paging";
import { $currentCompany } from "infrastructure/models/auth/user";

import {
  $rowCount,
  $rowData,
  getLocationsList,
  updateLocationListSuccess,
} from "../../models/location-list";

type Props = {
  changeModel?: (value: object) => void;
};

function CampaignFilter({ changeModel }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const rowData = useStore<IKeyValue[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);
  const currentCompany = useStore<IKeyValue | null>($currentCompany);
  const companyId = currentCompany?.id;

  const loadLocationList = (searchValue: string, pageNum: number) => {
    if (pageNum === 1) {
      updateLocationListSuccess();
    }

    getLocationsList({
      company_id: companyId,
      page_number: pageNum,
      row_count: paging.perPage,
      name: searchValue || undefined,
    });
  };

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      if (companyId && page > 1) {
        loadLocationList(searchValue, page);
      }

      return null;
    },
    [companyId, loadLocationList, searchValue]
  );

  const model = useMemo(
    () => ({
      location_id: null,
      platforms: null,
      period: null,
      states: [
        {
          id: "ACTING",
          name: "ACTING",
          value: "Активна",
        },
        {
          id: "PENDING",
          name: "PENDING",
          value: "Ожидание",
        },
      ],
    }),
    []
  );

  const fields = [
    {
      key: "states",
      title: "Статус",
      type: "checkbox-dropdown",
      data: [
        {
          id: "ACTING",
          name: "ACTING",
          value: "Активна",
        },
        {
          id: "PENDING",
          name: "PENDING",
          value: "Ожидание",
        },
        {
          id: "COMPLETED",
          name: "COMPLETED",
          value: "Завершена",
        },
      ],
    },
    {
      key: "location_id",
      title: "Местоположение",
      type: "virtual-list",
      data: rowData,
      virtualListProps: {
        loadNextPage: loadNextPage,
        rowCount: rowCount,
        type: "checkbox",
      },
      onSearch: (value: string) => {
        setSearchValue(value);
        loadLocationList(value, 1);
      },
      onDropdownOpened: (opened: boolean) => {
        if (opened) {
          loadLocationList(searchValue, 1);
        }
      },
    },
    {
      key: "platforms",
      title: "Моб.платформа",
      type: "radio-dropdown",
      data: [
        {
          name: "platforms",
          value: "IOS",
        },
        {
          name: "platforms",
          value: "ANDROID",
        },
      ],
    },
    {
      key: "period",
      title: "Дата",
      type: "date",
      data: [],
    },
  ];

  const filterChangedHandler = useCallback(
    (model: { [key: string]: any }) => {
      if (changeModel) {
        const serverModel = {
          ...model,
          platforms: model["platforms"] ? model["platforms"][0].id : undefined,
          location_id: model["location_id"]
            ? model["location_id"].map((location: IKeyValue) => location.id)
            : undefined,
          states:
            model["states"] && model["states"].length
              ? model["states"].map((state: IKeyValue) => state.id)
              : ["ACTING", "PENDING"],
          start_date: model["period"] ? model["period"][0] + ", 00:00" : undefined,
          end_date: model["period"] ? model["period"][1] + ", 23:59" : undefined,
        };

        changeModel(serverModel);
      }
    },
    [changeModel]
  );

  useEffect(() => {
    filterChangedHandler(model);
  }, [model, filterChangedHandler]);

  return (
    <FilterForm
      model={model}
      fields={fields}
      onFilterChanged={filterChangedHandler}
    />
  );
}

export default CampaignFilter;
