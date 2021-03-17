import React, { useCallback, useEffect } from "react";
import { Header, Table } from "ui";
import UserInfoForm from "./components/UserInfoForm";
import { CompanyPanel, TwoColumnLayout } from "domains";
import { Column } from "react-table";
import { TableColumnConfig } from "./config/TableColumConfig";
import { IUserData } from "./types/UserData";
import { useStore } from "effector-react";
import {$rowCount, $rowData, getUsersFx} from "./models/table";
import { $user, IUser } from "infrastructure/models/auth/user";
import { IPagination } from "infrastructure/types";
import { $paging } from "infrastructure/models/paging";
import NoUsers from "./components/NoUsers";
import { getUserDataFx } from "./models/form";

import "./models/init";

function Users() {
  const user = useStore<IUser | null>($user);
  const rowData = useStore<IUserData[]>($rowData);
  const rowCount = useStore<number>($rowCount);
  const paging = useStore<IPagination>($paging);

  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };

  const columns: Array<Column<any>> = TableColumnConfig();

  const loadNextPage = useCallback(
    (startIndex: number, stopIndex: number, page: number) => {
      const companyId = user?.company.id;
      if (companyId) {
        return getUsersFx({
          company_id: companyId,
          page_number: page,
          row_count: paging.perPage,
        });
      }

      return null;
    },
    [paging.perPage, user?.company.id]
  );

  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
  }, []);

  return (
    <TwoColumnLayout
      className="bg-input-grey"
      asideContent={<UserInfoForm />}
    >
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
