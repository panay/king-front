import React, { useEffect } from "react";
import Layout from "domain/Layout";
import Header from "ui/Header";
import EmptyCampaignsWindow from "ui/EmptyCampaignWindow";

function Settings() {
  useEffect(() => {
    document.title = "Настройки пользователя – Spark [radar]";
  });
  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };
  return (
    <Layout className="bg-input-grey" asideContent={<EmptyCampaignsWindow />}>
      <Header
        headerTitle="Burger King"
        placeholder="Поиск"
        onSearch={handleOnSearch}
      >
        <div>Карта/Таблица</div>
      </Header>
    </Layout>
  );
}

export default Settings;
