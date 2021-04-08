import React, { useCallback, useEffect } from "react";
import { Header, Table } from "ui";
import { TwoColumnLayout } from "domains";
import { useStore } from "effector-react";
import { IKeyValue, IPagination } from "infrastructure/types";
import { $paging } from "infrastructure/models/paging";
import { Column } from "react-table";
import { TableColumnConfig } from "./config/TableColumConfig";
import {
  $locationsIsChanged,
  $rowCount,
  $rowData,
  getLocationsList,
  searchLocationsByName, updateLocationListSuccess,
} from "./models/table";
import { ILocationData } from "./types/LocationData";
import { $currentCompany } from "infrastructure/models/auth/user";
import {$formIsChanged, getLocationDataFx, resetLocationData} from "./models/form";
import LocationInfoForm from "./components/LocationInfoForm";

import "./models/init";

function Location() {
  const rowData = useStore<ILocationData[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);
  const currentCompany = useStore<IKeyValue | null>($currentCompany);
  const locationsIsChanged = useStore<boolean>($locationsIsChanged);
  const formIsChanged = useStore<boolean>($formIsChanged);
  const companyId = currentCompany?.id;

  const handleOnSearch = (value: string) => {
    console.log("поиск по местоположениям :: ", value);
    if (companyId) {
      searchLocationsByName({
        company_id: companyId,
        page_number: 1,
        row_count: paging.perPage,
        name: value,
      });
    }
  };

  const columns: Array<Column<any>> = TableColumnConfig();

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      if (locationsIsChanged && companyId) {
        getLocationsList({
          company_id: companyId,
          page_number: page,
          row_count: paging.perPage,
        });
      }

      return null;
    },
    [companyId, paging.perPage, locationsIsChanged]
  );

  useEffect(() => {
    document.title = "Местоположения – Spark [radar]";

    updateLocationListSuccess();
    resetLocationData();
  }, []);

  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<LocationInfoForm />}>
      <Header
        headerTitle={"Местоположения"}
        placeholder="Поиск по местоположению"
        onSearch={handleOnSearch}
      />
      <div
        className="bg-white rounded-xl p-4 mt-6"
        style={{
          height: "calc(100vh - 125px)",
        }}
      >
        <Table
          items={rowData}
          rowCount={rowCount}
          columns={columns}
          rowClicked={(value) => getLocationDataFx(value as IKeyValue)}
          loadNextPage={loadNextPage}
          reload={formIsChanged || !locationsIsChanged}
        />
      </div>
    </TwoColumnLayout>
  );
}

export default Location;
