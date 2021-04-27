import React, { useCallback, useEffect, useMemo } from "react";
import { FilterForm } from "ui";
import { IKeyValue } from "infrastructure/types";

type Props = {
  changeModel?: (value: object) => void;
};

function CampaignFilter({ changeModel }: Props) {
  const defaultModel = {
    location: [],
    platforms: [],
    period: [],
    states: [
      {
        id: "ACTING",
        name: "ACTING",
      },
      {
        id: "PENDING",
        name: "PENDING",
      },
    ],
  };

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
      key: "location",
      title: "Местоположение",
      type: "checkbox-dropdown",
      data: [
        {
          id: "1234",
          name: "Ярославль",
          value: "Ярославль",
        },
        {
          id: "6666",
          name: "Шоссе Энтузиастов",
          value: "Шоссе Энтузиастов",
        },
        {
          id: "8888",
          name: "Ничего такого",
          value: "Ничего такого",
        },
        {
          id: "9999",
          name: "Татарстан Респ,Зеленодольский р-н, Зеленодольск г,",
          value: "Татарстан Респ,Зеленодольский р-н, Зеленодольск г,",
        },
      ],
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
          value: "Android",
        },
      ],
    },
  ];

  const filterChangedHandler = useCallback(
    (model: object) => {
      if (changeModel) {
        const myObj: { [index: string]: any } = model;
        debugger;
        const serverModel = {
          ...model,
          platforms: myObj["platforms"] ? myObj["platforms"][0].id : undefined,
          location_id: myObj["locations"]
            ? myObj["locations"][0].id
            : undefined,
          states:
            myObj["states"] && myObj["states"].length
              ? myObj["states"].map((state: IKeyValue) => state.id)
              : ["ACTING","PENDING"],
        };
        changeModel(serverModel);
      }
    },
    [changeModel, defaultModel]
  );

  useEffect(() => {
    // if(defaultModel)
    // filterChangedHandler(defaultModel);
  }, [defaultModel, filterChangedHandler]);

  return (
    <FilterForm
      model={defaultModel}
      fields={fields}
      onFilterChanged={filterChangedHandler}
    />
  );
}

export default CampaignFilter;
