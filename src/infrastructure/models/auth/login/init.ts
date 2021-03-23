import {
  $afterLogin,
  $authenticated,
  $checkedAuth,
  catchError,
  checkAuthFx,
  checkUserAuth,
  ILoginRequest,
  loginFx,
  loginSuccess,
  logoutFx,
  signOut,
  submitLogin,
} from "./";
import {
  checkAuth,
  csrfToken,
  logIn,
  logOut,
  setAxiosAuthTokenHeader,
  setAxiosXSRFTokenHeader,
} from "infrastructure/services/auth-service";
import { clearUser } from "../user";

const authReducer = (state: boolean, payload: boolean) => payload;

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

  return response?.data;
};

const logout = async () => {
  const response = await logOut();
  if (response.status === 200) {
    setAxiosAuthTokenHeader("");
    clearUser(true);
  }
  return response.status !== 200;
};

checkUserAuth.watch((login) => checkAuthFx(login));
submitLogin.watch((request) => loginFx(request));
signOut.watch(logoutFx);

$afterLogin.on(loginSuccess, authReducer);

$authenticated
  .on(checkAuthFx.doneData, authReducer)
  .on(loginSuccess, authReducer)
  .on(logoutFx.doneData, authReducer);

$checkedAuth
  .on(checkAuthFx.doneData, authReducer)
  .on(loginSuccess, authReducer);

checkAuthFx.use(isAuth);
loginFx.use(login);
logoutFx.use(logout);
