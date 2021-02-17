import { $user, getUserFx, IUser } from "./";
import axios from "axios";
import "../../../../infrastructure/config/axios.config";

const reducer = (state: IUser, payload: IUser) => {
  return {
    ...state,
    ...payload,
  };
};
const getUser = async (token: string) => {
  const response = await axios.get("/users/user_info", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

$user.on(getUserFx.doneData, reducer);

getUserFx.use(getUser);
