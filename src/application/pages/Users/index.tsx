import React, { useEffect, useMemo } from "react";
import { Header, Table } from "ui";
import UserInfoForm from "./components/UserInfoForm";
import { CompanyPanel, TwoColumnLayout } from "domains";
import { Column } from "react-table";

function Users() {
  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
  });

  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };

  const rowData = useMemo(() => [{
      userName: "Жикина Берта Леонидовна",
      userRole: "ADMIN",
      email: "berta@yandex.ru",
      isActive: true
  },{
      userName: "Жикина Берта Леонидовна",
      userRole: "MARKETING",
      email: "berta@yandex.ru",
      isActive: false
  },{
      userName: "Рубашкин Филимон Андреевич ",
      userRole: "ADMIN",
      email: "filimobn@yandex.ru",
      isActive: true
  },{
      userName: "Жикина Берта Леонидовна",
      userRole: "MARKETING",
      email: "berta@yandex.ru",
      isActive: false
  },{
      userName: "Жикина Берта Леонидовна",
      userRole: "ADMIN",
      email: "berta@yandex.ru",
      isActive: true
  }], []);
  const columns: Array<Column<any>> = useMemo(
    () => [
      {
        Header: "Имя",
        accessor: "userName",
      },
      {
        Header: "Роль",
        accessor: "userRole",
      },
      {
        Header: "Почта",
        accessor: "email",
      },
      {
        Header: "Признак активности",
        accessor: "isActive",
        Cell: (props) => {
          return (
            <span className={`text-xs bg-opacity-20 text-center px-2 py-1 rounded ${props.value ? "bg-seagreen text-seagreen" : "bg-warning text-warning"}`}>
              {props.value ? "Активен" : "Не активен"}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<UserInfoForm />}>
      <Header
        headerTitle={<CompanyPanel />}
        placeholder="Поиск пользователя"
        onSearch={handleOnSearch}
      />
      <div className="bg-white rounded-xl p-4 mt-6" style={{
          height: "calc(100vh - 70px)"
      }}>
        <Table rowData={rowData} columns={columns} />
      </div>
    </TwoColumnLayout>
  );
}

export default Users;
