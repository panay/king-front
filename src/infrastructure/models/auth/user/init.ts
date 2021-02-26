import { $user, getUserFx, IUser, updateCompanyUser } from "./";
import { getUserInfo } from "infrastructure/services/user-service";
import { IKeyValue } from "infrastructure/types";

const userReducer = (state: IUser, payload: IUser) => {
  return {
    ...state,
    ...payload,
  };
};

const companyUserReducer = (state: IUser, payload: IKeyValue) => {
  const company = { ...payload };
  return {
    ...state,
    company,
  };
};

const getUser = async () => {
  const response = await getUserInfo();

  return response.data;
};

$user
  .on(getUserFx.doneData, userReducer)
  .on(updateCompanyUser, companyUserReducer);

getUserFx.use(getUser);
