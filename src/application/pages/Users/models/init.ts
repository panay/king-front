import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";

import { guard, sample } from "effector";
import { deleteUserFx, getUserDataFx } from "./form";
import { $user } from "infrastructure/models/auth/user";
import { IUsersRequest } from "../types/UserData";
import { updateUsersFx } from "./table";

// to reset userData after delete of a user
sample({
  clock: deleteUserFx.doneData,
  fn: () => null,
  target: getUserDataFx,
});

// to update table after delete of a user
guard({
  clock: deleteUserFx.doneData,
  source: sample({
    source: $user,
    fn: (user) => ({ company_id: user?.company.id } as IUsersRequest),
  }),
  filter: (user) => !!(user && user.company_id),
  target: updateUsersFx,
});
