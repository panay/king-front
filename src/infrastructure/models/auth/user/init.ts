import {
  $currentCompany,
  $user,
  clearUser,
  IUser,
  updateCurrentCompany,
} from "./";
import { IKeyValue } from "infrastructure/types";
import { loginFx } from "../login";

const userReducer = (state: IUser | null, payload: IUser | null) => {
  if (payload) {
    const isRootAdmin =
      payload?.role.name === "ADMIN" &&
      (!payload?.company || !Object.keys(payload?.company).length);

    return {
      ...state,
      ...payload,
      isRootAdmin,
    };
  }

  return null;
};

const currentCompanyReducer = (state: IKeyValue | null, payload: IKeyValue) => {
  return { ...payload };
};

const clearUserReducer = (state: IUser | null, payload: boolean) =>
  payload ? null : state;

$user.on(loginFx.doneData, userReducer).on(clearUser, clearUserReducer);

$currentCompany.on(updateCurrentCompany, currentCompanyReducer);
