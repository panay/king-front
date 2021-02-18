import {forward, guard, sample} from "effector";
import { getUserFx } from "./user";
import { $authenticated, submitFx } from "./login";
import "./user/init";
import "./login/init";

guard({
  source: $authenticated,
  clock: submitFx.doneData,
  filter: $authenticated,
  target: getUserFx
});
