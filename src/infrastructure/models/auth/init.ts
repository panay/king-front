import { guard } from "effector";
import { $user, getUserFx } from "./user";
import { $authenticated, loginFx } from "./login";
import { getCompaniesFx } from "../company";
import "./user/init";
import "./login/init";
import "../company/init";

guard({
  source: $authenticated,
  clock: loginFx.doneData,
  filter: (value) => value,
  target: getUserFx,
});

// todo: проверить как работает получение компаний при первом логине:
guard({
  source: $user,
  clock: getUserFx.doneData,
  filter: (value) => {
    return value.userRole.id !== "ADMIN";
  },
  target: getCompaniesFx,
});
