import React, { useContext, useEffect } from "react";
import Layout from "domain/Layout";
import Header from "ui/Header";
import EmptyCampaignsWindow from "ui/EmptyCampaignWindow";
import TitleWithDropdown from "ui/TitleWithDropdown";
import { IKeyValue } from "infrastructure/types/key-value.interface";
import { updateCompanyUser } from "infrastructure/models/auth/user";
import UserContext from "../../../infrastructure/context/UserContext";

function Home() {
  const user = useContext(UserContext);

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

  useEffect(() => {
    document.title = "Главная – Spark [radar]";

    if (!user || user?.company === null) {
      updateCompanyUser(companies[0]);
    }
  }, [user, companies]);

  const handleSelectItem = (item: IKeyValue) => {
    updateCompanyUser(item);
  };

  return (
    <Layout className="bg-input-grey" asideContent={<EmptyCampaignsWindow />}>
      <Header
        headerTitle={
          <TitleWithDropdown
            caption="Компания"
            name={user?.company?.name || ""}
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
