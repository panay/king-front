import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { guard, sample } from "effector";
import { createUserFx, deleteUserFx, updateUserFx } from "./form";
import { changeUsers, getUsersList, updateUserListSuccess } from "./table";
import {
  $currentCompany,
  updateCurrentCompany,
} from "infrastructure/models/auth/user";
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

guard({
  source: sample(
    $currentCompany,
    updateCurrentCompany,
    (value: IKeyValue | null) => {
      if (!value) return null;

      updateUserListSuccess();
      changeUsers(false);

      return {
        company_id: value?.id,
        page_number: 1,
      };
    }
  ),
  filter: (value) => !!value,
  target: getUsersList,
});
