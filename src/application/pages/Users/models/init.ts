import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { sample } from "effector";
import { createUserFx, deleteUserFx, updateUserFx } from "./form";
import { changeUsers, getUsersList, updateUserListSuccess } from "./table";
import { updateCurrentCompany } from "infrastructure/models/auth/user";
import { IKeyValue } from "infrastructure/types";

sample({
  clock: deleteUserFx.doneData,
  target: updateUserListSuccess,
});

sample({
  clock: createUserFx.doneData,
  target: updateUserListSuccess,
});

sample({
  clock: updateUserFx.doneData,
  target: updateUserListSuccess,
});

sample({
  source: updateCurrentCompany,
  fn: (company: IKeyValue) => {
    updateUserListSuccess();

    return {
      company_id: company.id,
      page_number: 1,
    };
  },
  target: getUsersList,
});
