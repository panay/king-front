import { $user, getUserFx, IUser } from "./";
import {getUserInfo} from "../../services/user-service";

const reducer = (state: IUser, payload: IUser) => {
  return {
    ...state,
    ...payload,
  };
};
const getUser = async (token: string) => {
  const response = await getUserInfo(token)

  return response.data;
};

$user.on(getUserFx.doneData, reducer);

getUserFx.use(getUser);
