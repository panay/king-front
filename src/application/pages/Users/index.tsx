import React, { useCallback, useContext, useEffect } from "react";
import { Header, Table } from "ui";
import UserInfoForm from "./components/UserInfoForm";
import { CompanyPanel, TwoColumnLayout } from "domains";
import { Column } from "react-table";
import { TableColumnConfig } from "./config/TableColumConfig";
import { IUserData } from "./types/UserData";
import { useStore } from "effector-react";
import {
  $rowCount,
  $rowData,
  getUsersList,
  searchUsersByName,
} from "./models/table";
import { IPagination } from "infrastructure/types";
import { $paging } from "infrastructure/models/paging";
import NoUsers from "./components/NoUsers";
import { getAllRoles, getUserDataFx } from "./models/form";
import UserContext from "infrastructure/context/UserContext";

import "./models/init";

function Users() {
  const user = useContext(UserContext);
  const rowData = useStore<IUserData[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);
  const companyId = user?.company.id;

  const handleOnSearch = (value: string) => {
    if (companyId) {
      searchUsersByName({
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
      if (companyId) {
        getUsersList({
          company_id: companyId,
          page_number: page,
          row_count: paging.perPage,
        });
      }

      return null;
    },
    [companyId, paging.perPage]
  );

  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
    getAllRoles();
  }, []);

  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<UserInfoForm />}>
      <Header
        headerTitle={<CompanyPanel />}
        placeholder="Поиск пользователя"
        onSearch={handleOnSearch}
      />
      <div
        className="bg-white rounded-xl p-4 mt-6"
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        <Table
          items={rowData}
          rowCount={rowCount}
          columns={columns}
          rowClicked={(value) => getUserDataFx(value as IUserData)}
          loadNextPage={loadNextPage}
          noDataComponent={<NoUsers />}
        />
      </div>
    </TwoColumnLayout>
  );
}

export default Users;
