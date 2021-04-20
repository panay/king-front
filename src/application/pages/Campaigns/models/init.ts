import "./table/init";
import "./form/init";
import "infrastructure/models/paging/init";
import "infrastructure/models/auth/init";

import { sample } from "effector";
import { createCampaignFx, deleteCampaignFx, updateCampaignFx } from "./form";
import { updateCampaignListSuccess } from "./table";

sample({
  clock: deleteCampaignFx.doneData,
  target: updateCampaignListSuccess,
});

sample({
  clock: createCampaignFx.doneData,
  target: updateCampaignListSuccess,
});

sample({
  clock: updateCampaignFx.doneData,
  target: updateCampaignListSuccess,
});
