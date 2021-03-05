import {
  $authenticated,
  checkAuthFx,
  csrfTokenFx,
  ILoginName,
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

const isAuth = async (body: ILoginName) => {
  const response = await checkAuth(body);
  if (response.status === 200) {
    setAxiosXSRFTokenHeader(response.data["x-xsrf-token"]);
    setAxiosAuthTokenHeader(response.data["x-auth-token"]);
  } else if (response.status === 401) {
    $authenticated.reset();
  }

  return response.status === 200;
};

const getCSRFToken = async () => {
  const response = await csrfToken();
  if (response.status === 200) {
    setAxiosXSRFTokenHeader(response.data['X-XSRF-TOKEN']);
  }
};

const login = async (body: ILoginRequest) => {
  await getCSRFToken();
  const response = await logIn(body);
  if (response.status === 200) {
    setAxiosAuthTokenHeader(response.data['X-Auth-Token']);
  }
  return response.status === 200;
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
csrfTokenFx.use(getCSRFToken);
loginFx.use(login);
logoutFx.use(logout);
