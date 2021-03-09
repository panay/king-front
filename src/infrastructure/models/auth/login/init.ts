import {
  $authenticated,
  catchError,
  checkAuthFx,
  ILoginRequest,
  loginFx,
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
  }
  return response.status !== 200;
};

$authenticated
  .on(checkAuthFx.doneData, authReducer)
  .on(loginFx.doneData, authReducer)
  .on(logoutFx.doneData, authReducer);

checkAuthFx.use(isAuth);
loginFx.use(login);
logoutFx.use(logout);
