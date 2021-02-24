import React, { useEffect } from "react";
import Header from "ui/Header";
import Layout from "domain/Layout";
import UserInfoForm from "./components/UserInfoForm";

function Users() {
  useEffect(() => {
    document.title = "Пользователи – Spark [radar]";
  });
  const handleOnSearch = (value: string) => {
      console.log('Users Search :: ', value);
  };
  return (
    <Layout className="bg-input-grey" asideContent={<UserInfoForm />}>
      <Header
        headerTitle="Burger King"
        placeholder="Поиск пользователя"
        onSearch={handleOnSearch}
      />
    </Layout>
  );
}

export default Users;
