import React, { useContext, useEffect } from "react";
import { updateCompanyUser } from "infrastructure/models/auth/user";
import UserContext from "infrastructure/context/UserContext";
import {TitleWithDropdown} from "ui";
import { IKeyValue } from "infrastructure/types";

function CompanySelectionPanel() {
  const user = useContext(UserContext);
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
    if (!user?.company) {
      updateCompanyUser(companies[0]);
    }
  }, [user, companies]);

  const handleSelectItem = (item: IKeyValue) => {
    updateCompanyUser(item);
  };

  return (
    <TitleWithDropdown
      caption="Компания"
      name={user?.company?.name || ""}
      list={companies}
      onSelectItem={handleSelectItem}
    />
  );
}

export default CompanySelectionPanel;
