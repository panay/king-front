import React, { useEffect } from "react";
import Layout from "domain/Layout";
import Header from "ui/Header";
import EmptyCampaignsWindow from "ui/EmptyCampaignWindow";
import TitleWithDropdown from "../../../ui/TitleWithDropdown";
import {IKeyValue} from "../../../infrastructure/types/key-value.interface";

function Home() {
  useEffect(() => {
    document.title = "Главная – Spark [radar]";
  });

  const handleOnSearch = (value: string) => {
    console.log("Home Search :: ", value);
  };

  const companies = [
    {
      id: "mac",
      name: "McDonald's",
    },
    {
      id: "kfc",
      name: "KFC",
    },
    {
      id: "potato",
      name: "Крошка картошка",
    },
    {
      id: "king",
      name: "Burger King",
    },
  ];

  const handleSelectItem = (item: IKeyValue) => {
    console.log("handle select uitem :: ", item);
  };

  return (
    <Layout className="bg-input-grey" asideContent={<EmptyCampaignsWindow />}>
      <Header
        headerTitle={
          <TitleWithDropdown
            caption="Компания"
            name={companies[companies.length - 1].name}
            list={companies}
            onSelectItem={handleSelectItem}
          />
        }
        onSearch={handleOnSearch}
      />
    </Layout>
  );
}

export default Home;
