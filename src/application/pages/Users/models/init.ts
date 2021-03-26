import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";

import { sample } from "effector";
import { createUserFx, deleteUserFx } from "./form";
import { updateUserListSuccess, updateUsersFx } from "./table";

sample({
  clock: deleteUserFx.doneData,
  target: updateUserListSuccess,
});

sample({
  clock: createUserFx.doneData,
  target: updateUserListSuccess,
});

sample({
  clock: updateUsersFx.doneData,
  target: updateUserListSuccess,
});
