import React, { useContext, useEffect } from "react";
import UserContext from "infrastructure/context/UserContext";
import { TitleWithDropdown } from "ui";
import { IKeyValue } from "infrastructure/types";
import "infrastructure/models/company/init";
import { updateCompanyUser } from "infrastructure/models/auth/user";
import { $companies, getCompaniesList } from "infrastructure/models/company";
import { useStore } from "effector-react";
import CreateCompanyFormControl from "./components/CreateCompanyFormControl";

function CompanyPanel() {
  const user = useContext(UserContext);
  const companies = useStore($companies);
  const isRootAdmin =
    companies.length > 0 &&
    user?.role.name === "ADMIN" &&
    (!user?.company || !Object.keys(user?.company).length);

  useEffect(() => {
    if (isRootAdmin) {
      updateCompanyUser(companies[0]);
    }
  }, [isRootAdmin, companies]);

  const handleOnOpenDropdown = (opened: boolean) => {
    if (opened) getCompaniesList();
  };

  const handleSelectItem = (item: IKeyValue) => {
    updateCompanyUser(item);
  };

  if (user) {
    if (isRootAdmin) {
      return (
        <>
          <div className="text-xs text-icon-grey font-normal">Компания</div>
          <TitleWithDropdown
            current={user?.company as IKeyValue}
            list={companies}
            onOpen={handleOnOpenDropdown}
            onSelectItem={handleSelectItem}
          >
            <CreateCompanyFormControl />
          </TitleWithDropdown>
        </>
      );
    }

    return (
      <>
        <div className="text-xs text-icon-grey font-normal">Компания</div>
        {user?.company?.name}
      </>
    );
  }

  return <></>;
}

export default CompanyPanel;
