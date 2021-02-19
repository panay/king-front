import { $authenticated, ILoginRequest, logoutFx, loginFx } from "./";
import { logIn, logOut } from "../../../services/auth-service";

const doneReducer = (state: boolean, payload: boolean) => payload;

const login = async (body: ILoginRequest) => {
  const response = await logIn(body);
  return !!response.data;
};

const logout = async () => {
  await logOut();
  return false;
};

$authenticated
  .on(loginFx.doneData, doneReducer)
  .on(logoutFx.doneData, doneReducer);

loginFx.use(login);
logoutFx.use(logout);
