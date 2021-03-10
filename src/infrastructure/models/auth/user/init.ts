import { $user, getUserFx, IUser, updateCompanyUser } from "./";
import { getUserInfo } from "infrastructure/services/user-service";
import { IKeyValue } from "infrastructure/types";

const userReducer = (state: IUser | null, payload: IUser | null) => {
  return payload
    ? {
        ...state,
        ...payload,
      }
    : null;
};

const companyUserReducer = (state: IUser | null, payload: IKeyValue) => {
  const company = { ...payload };
  return state
    ? {
        ...state,
        company,
      }
    : state;
};

const getUser = async (): Promise<IUser | null> => {
  let response = null;
  try {
    response = await getUserInfo();
  } catch (err) {}

  return response?.data || null;
};

$user
  .on(getUserFx.doneData, userReducer)
  .on(updateCompanyUser, companyUserReducer);

getUserFx.use(getUser);
