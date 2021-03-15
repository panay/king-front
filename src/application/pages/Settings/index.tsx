import React, { useEffect } from "react";
import {Header, EmptyCampaignsWindow} from "ui";
import { CompanyPanel, TwoColumnLayout } from "domains";

function Settings() {
  useEffect(() => {
    document.title = "Настройки пользователя – Spark [radar]";
  }, []);
  const handleOnSearch = (value: string) => {
    console.log("Users Search :: ", value);
  };
  return (
    <TwoColumnLayout
      className="bg-input-grey"
      asideContent={<EmptyCampaignsWindow />}
    >
      <Header
        headerTitle={<CompanyPanel />}
        onSearch={handleOnSearch}
      />
    </TwoColumnLayout>
  );
}

export default Settings;
