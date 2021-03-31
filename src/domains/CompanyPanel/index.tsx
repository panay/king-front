import React, { useContext, useEffect } from "react";
import UserContext from "infrastructure/context/UserContext";
import { TitleWithDropdown } from "ui";
import { IKeyValue } from "infrastructure/types";
import "infrastructure/models/company/init";
import {
  $currentCompany,
  updateCurrentCompany,
} from "infrastructure/models/auth/user";
import { $companies, getCompaniesList } from "infrastructure/models/company";
import { useStore } from "effector-react";
import CreateCompanyFormControl from "./components/CreateCompanyFormControl";

function CompanyPanel() {
  const user = useContext(UserContext);
  const companies = useStore($companies);
  const currentCompany = useStore($currentCompany);

  useEffect(() => {
    if (user?.isRootAdmin) {
      if (
        (!currentCompany ||
          (currentCompany && !Object.keys(currentCompany).length)) &&
        companies?.length
      ) {
        updateCurrentCompany(companies[0]);
      }
    } else {
      updateCurrentCompany(user?.company as IKeyValue);
    }
  }, [currentCompany, companies, user?.company, user?.isRootAdmin]);

  const handleOnOpenDropdown = (opened: boolean) => {
    if (opened) {
      getCompaniesList();
    }
  };

  const handleSelectItem = (item: IKeyValue) => {
    updateCurrentCompany(item);
  };

  if (user) {
    if (user?.isRootAdmin && currentCompany?.id) {
      return (
        <>
          <div className="text-xs text-icon-grey font-normal">Компания</div>
          <TitleWithDropdown
            current={currentCompany}
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
        {currentCompany?.name}
      </>
    );
  }

  return <></>;
}

export default CompanyPanel;
