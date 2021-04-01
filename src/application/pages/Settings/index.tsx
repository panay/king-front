import React, { useEffect } from "react";
import {Header, EmptyCampaignsWindow} from "ui";
import { CompanyPanel, TwoColumnLayout } from "domains";
import {ReactComponent as MockCampaignsImg} from "../../../infrastructure/assets/images/svgs/mock-campaigns.svg";

function Settings() {
  useEffect(() => {
    document.title = "Настройки пользователя – Spark [radar]";
  }, []);
  const handleOnSearch = (value: string) => {
    console.log("Settings Search :: ", value);
  };
  return (
    <TwoColumnLayout
      className="bg-input-grey"
      asideContent={<MockCampaignsImg style={{width: "100%"}} />}
    >
      <Header
        headerTitle={<CompanyPanel />}
        onSearch={handleOnSearch}
      />
    </TwoColumnLayout>
  );
}

export default Settings;
