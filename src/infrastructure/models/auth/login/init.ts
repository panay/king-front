import {
  $afterLogin,
  $authenticated,
  catchError,
  checkAuthFx,
  ILoginRequest,
  loginFx,
  loginSuccess,
  logoutFx,
} from "./";
import {
  checkAuth,
  csrfToken,
  logIn,
  logOut,
  setAxiosAuthTokenHeader,
  setAxiosXSRFTokenHeader,
} from "infrastructure/services/auth-service";
import { $user, clearUser, IUser } from "../user";

const authReducer = (state: boolean, payload: boolean) => payload;
const clearUserReducer = (state: IUser | null, payload: boolean) =>
  payload ? null : state;

const isAuth = async (login: string) => {
  let response = null;
  try {
    response = await checkAuth(login);
    if (response.status === 200) {
      setAxiosXSRFTokenHeader(response.data["X-XSRF-TOKEN"]);
      setAxiosAuthTokenHeader(response.headers["x-auth-token"]);
    }
  } catch (err) {
    $authenticated.reset();
  }

  return response?.status === 200;
};

const getCSRFToken = async () => {
  const response = await csrfToken();
  if (response.status === 200) {
    setAxiosXSRFTokenHeader(response.data["X-XSRF-TOKEN"]);
  }
};

const login = async (body: ILoginRequest) => {
  await getCSRFToken();
  let response = null;
  try {
    response = await logIn(body);
    if (response.status === 200) {
      setAxiosAuthTokenHeader(response.headers["x-auth-token"]);
      loginSuccess(true);
    }
  } catch (err) {
    catchError("Неверный логин/пароль");
  }

  return response?.status === 200;
};

const logout = async () => {
  const response = await logOut();
  if (response.status === 200) {
    setAxiosAuthTokenHeader("");
    clearUser(true);
  }
  return response.status !== 200;
};

$afterLogin.on(loginSuccess, authReducer);

$authenticated
  .on(checkAuthFx.doneData, authReducer)
  .on(loginFx.doneData, authReducer)
  .on(logoutFx.doneData, authReducer);

$user.on(clearUser, clearUserReducer);

checkAuthFx.use(isAuth);
loginFx.use(login);
logoutFx.use(logout);
