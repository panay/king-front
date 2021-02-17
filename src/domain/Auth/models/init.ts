import { sample } from "effector";
import { $authToken, submitFx } from "./auth";
import { getUserFx } from "./user";
import "./user/init";
import "./auth/init";

sample({
  clock: submitFx.doneData,
  source: $authToken,
  target: getUserFx,
});
