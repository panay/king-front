import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { sample } from "effector";
import { createUserFx, deleteUserFx, updateUserFx } from "./form";
import { updateUserListSuccess } from "./table";

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
