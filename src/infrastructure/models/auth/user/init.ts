import { $user, clearUser, IUser, updateCompanyUser } from "./";
import { IKeyValue } from "infrastructure/types";
import { loginFx } from "../login";

const userReducer = (state: IUser | null, payload: IUser | null) => {
  return payload
    ? {
        ...state,
        ...payload,
      }
    : null;
};

const companyUserReducer = (state: IUser | null, payload: IKeyValue) => {
  return state
    ? {
        ...state,
        ...payload,
      }
    : state;
};

const clearUserReducer = (state: IUser | null, payload: boolean) =>
  payload ? null : state;

$user
  .on(loginFx.doneData, userReducer)
  .on(updateCompanyUser, companyUserReducer)
  .on(clearUser, clearUserReducer);
