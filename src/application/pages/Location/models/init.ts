import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { sample } from "effector";
import { createLocationFx, deleteLocationFx, updateLocationFx } from "./form";
import { updateLocationListSuccess } from "./table";

sample({
  clock: deleteLocationFx.doneData,
  target: updateLocationListSuccess,
});

sample({
  clock: createLocationFx.doneData,
  target: updateLocationListSuccess,
});

sample({
  clock: updateLocationFx.doneData,
  target: updateLocationListSuccess,
});
