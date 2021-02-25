import React, { useEffect } from "react";
import { Header } from "ui";
import UserInfoForm from "./components/UserInfoForm";
import { CompanySelectionPanel, TwoColumnLayout } from "domains";

function Users() {
  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
  });
  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };
  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<UserInfoForm />}>
      <Header
        headerTitle={<CompanySelectionPanel />}
        placeholder="Поиск пользователя"
        onSearch={handleOnSearch}
      />
    </TwoColumnLayout>
  );
}

export default Users;
