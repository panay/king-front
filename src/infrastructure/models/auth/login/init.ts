import { $authenticated, ILoginRequest, logoutFx, loginFx } from "./";
import { logIn, logOut } from "infrastructure/services/auth-service";

const doneReducer = (state: boolean, payload: boolean) => payload;

const login = async (body: ILoginRequest) => {
  const response = await logIn(body);
  return response.status === 200;
};

const logout = async () => {
  const response = await logOut();
  return response.status !== 200;
};

$authenticated
  .on(loginFx.doneData, doneReducer)
  .on(logoutFx.doneData, doneReducer);

loginFx.use(login);
logoutFx.use(logout);
