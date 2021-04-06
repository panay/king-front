import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { guard, sample } from "effector";
import { createLocationFx, deleteLocationFx, updateLocationFx } from "./form";
import {
  changeLocations,
  getLocationsList,
  updateLocationListSuccess,
} from "./table";
import {
  $currentCompany,
  updateCurrentCompany,
} from "infrastructure/models/auth/user";
import { IKeyValue } from "infrastructure/types";

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

guard({
  source: sample(
    $currentCompany,
    updateCurrentCompany,
    (value: IKeyValue | null) => {
      if (!value) return null;

      updateLocationListSuccess();
      changeLocations(false);

      return {
        company_id: value?.id,
        page_number: 1,
      };
    }
  ),
  filter: (value) => !!value,
  target: getLocationsList,
});
