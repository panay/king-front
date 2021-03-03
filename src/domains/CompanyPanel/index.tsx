import React, { useContext, useEffect } from "react";
import UserContext from "infrastructure/context/UserContext";
import { TitleWithDropdown } from "ui";
import { IKeyValue } from "infrastructure/types";
import "infrastructure/models/company/init";
import { updateCompanyUser } from "infrastructure/models/auth/user";
import {
  $companies,
  createNewCompanyFx,
  getCompaniesFx,
} from "infrastructure/models/company";
import { useStore } from "effector-react";
import CreateCompanyFormControl from "./components/CreateCompanyFormControl";

function CompanyPanel() {
  const user = useContext(UserContext);
  const companies = useStore($companies);

  useEffect(() => {
    if (!user?.company) {
      updateCompanyUser(companies[0]);
    }
  }, [user, companies]);

  const handleOnOpenDropdown = (opened: boolean) => {
    if (opened) {
      return getCompaniesFx();
    }
  };

  const handleSelectItem = (item: IKeyValue) => {
    updateCompanyUser(item);
  };

  // todo: если суперадмин - список, если юзер - название
  return (
    <>
      <div className="text-xs text-icon-grey font-normal">Компания</div>
      {user?.userRole ? (
        user?.company?.name
      ) : (
        <TitleWithDropdown
          current={user?.company as IKeyValue}
          list={companies}
          onOpen={handleOnOpenDropdown}
          onSelectItem={handleSelectItem}
        >
          <CreateCompanyFormControl onCreate={createNewCompanyFx} />
        </TitleWithDropdown>
      )}
    </>
  );
}

export default CompanyPanel;