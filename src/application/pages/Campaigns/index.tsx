import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { IKeyValue, IPagination } from "infrastructure/types";
import { $currentCompany } from "infrastructure/models/auth/user";
import { Header, Table } from "ui";
import { TwoColumnLayout } from "domains";
import CampaignForm from "./components/CampaignForm";
import { Column } from "react-table";
import { TableColumnConfig } from "./config/TableColumConfig";
import {
  $campaignsIsChanged,
  $rowCount,
  $rowData,
  changeCampaigns,
  getCampaignsList,
  updateCampaignListSuccess,
} from "./models/table";
import {
  $formIsChanged,
  getCampaignDataFx,
  resetCampaignData,
} from "./models/form";
import { $paging } from "infrastructure/models/paging";
import { ICampaignData } from "./types/CampaignsData";

import "./models/init";
import CampaignFilter from "./components/CampaignFilter";

function Campaigns() {
  const [searchValue, setSearchValue] = useState("");

  const rowData = useStore<ICampaignData[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);
  const currentCompany = useStore<IKeyValue | null>($currentCompany);
  const campaignsIsChanged = useStore<boolean>($campaignsIsChanged);
  const formIsChanged = useStore<boolean>($formIsChanged);
  const companyId = currentCompany?.id;

  const handleOnSearch = (value: string) => {
    if (companyId) {
      setSearchValue(value);
    }
  };

  const columns: Array<Column<any>> = TableColumnConfig();

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      if ((campaignsIsChanged && companyId) || (companyId && page > 1)) {
        getCampaignsList({
          company_id: companyId,
          page_number: page,
          row_count: paging.perPage,
          name: searchValue || undefined,
        });
      }

      return null;
    },
    [companyId, paging.perPage, campaignsIsChanged, searchValue]
  );

  const changeModelHandler = (event: any) => {
    debugger;
  };

  useEffect(() => {
    document.title = "Местоположения – Spark [radar]";

    if (companyId) {
      if (!campaignsIsChanged) {
        updateCampaignListSuccess();
        resetCampaignData();

        getCampaignsList({
          company_id: companyId,
          page_number: 1,
          name: searchValue || undefined,
        });
      } else {
        changeCampaigns(false);
      }
    }
  }, [companyId, campaignsIsChanged, searchValue]);

  useEffect(() => {
    document.title = "Кампании – Spark [radar]";
  }, []);

  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<CampaignForm />}>
      <Header
        headerTitle="Кампании"
        placeholder="Поиск по кампаниям"
        onSearch={handleOnSearch}
      />
      <div
        className="bg-white rounded-xl p-4 mt-6"
        style={{
          height: "calc(100vh - 115px)",
        }}
      >
        <Table
          items={rowData}
          rowCount={rowCount}
          columns={columns}
          rowClicked={(value) => getCampaignDataFx(value as IKeyValue)}
          loadNextPage={loadNextPage}
          reload={formIsChanged || !campaignsIsChanged}
        >
          <CampaignFilter changeModel={changeModelHandler} />
        </Table>
      </div>
    </TwoColumnLayout>
  );
}

export default Campaigns;
