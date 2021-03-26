import { guard } from "effector";
import { $user } from "./user";
import { loginFx } from "./login";
import { getCompaniesFx } from "../company";
import "./user/init";
import "./login/init";
import "../company/init";

guard({
  source: $user,
  clock: loginFx.doneData,
  filter: (value) => {
    return !!value && (!value.company || !Object.keys(value.company).length);
  },
  target: getCompaniesFx,
});
