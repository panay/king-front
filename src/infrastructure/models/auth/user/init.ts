import { $user, getUserFx, IUser, updateCompanyUser } from "./";
import { getUserInfo } from "../../../services/user-service";
import { IKeyValue } from "../../../types/key-value.interface";

const reducer = (state: IUser, payload: IUser) => {
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

$user.on(getUserFx.doneData, reducer).on(updateCompanyUser, companyUserReducer);

getUserFx.use(getUser);
