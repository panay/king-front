import { guard } from "effector";
import { getUserFx } from "./user";
import { $authenticated, loginFx } from "./login";
import "./user/init";
import "./login/init";

guard({
  source: $authenticated,
  clock: loginFx.doneData,
  filter: $authenticated,
  target: getUserFx,
});
