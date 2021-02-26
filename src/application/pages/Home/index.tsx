import React, { useEffect } from "react";
import {EmptyCampaignsWindow, Header} from "ui";
import { CompanyPanel, TwoColumnLayout } from "domains";

function Home() {
  const handleOnSearch = (value: string) => {
    console.log("Home Search :: ", value);
  };

  useEffect(() => {
    document.title = "Главная – Spark [radar]";
  }, []);

  return (
    <TwoColumnLayout
      className="bg-input-grey"
      asideContent={<EmptyCampaignsWindow />}
    >
      <Header headerTitle={<CompanyPanel />} onSearch={handleOnSearch} />
    </TwoColumnLayout>
  );
}

export default Home;
