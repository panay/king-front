import React, { useEffect, useMemo, useState } from "react";
import { Header, Table } from "ui";
import UserInfoForm from "./components/UserInfoForm";
import { CompanyPanel, TwoColumnLayout } from "domains";
import { Column } from "react-table";
import { TableColumnConfig } from "./config/TableColumConfig";

function Users() {
  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
  });

  const [userData, getUserData] = useState<unknown>(null);

  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };

  const rowData = useMemo(
    () => [
      {
        userName: "Жикина Берта Леонидовна",
        userRole: "ADMIN",
        email: "berta@yandex.ru",
        isActive: true,
      },
      {
        userName: "Жикина Берта Леонидовна",
        userRole: "MARKETING",
        email: "berta@yandex.ru",
        isActive: false,
      },
      {
        userName: "Рубашкин Филимон Андреевич ",
        userRole: "ADMIN",
        email: "filimobn@yandex.ru",
        isActive: true,
      },
      {
        userName: "Жикина Берта Леонидовна",
        userRole: "MARKETING",
        email: "berta@yandex.ru",
        isActive: false,
      },
      {
        userName: "Жикина Берта Леонидовна",
        userRole: "ADMIN",
        email: "berta@yandex.ru",
        isActive: true,
      },
    ],
    []
  );
  const columns: Array<Column<any>> = TableColumnConfig();

  return (
    <TwoColumnLayout
      className="bg-input-grey"
      asideContent={<UserInfoForm userData={userData} />}
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
          rowData={rowData}
          columns={columns}
          rowClicked={(value) => getUserData(() => value)}
        />
      </div>
    </TwoColumnLayout>
  );
}

export default Users;
