import { globalService } from "../config/axios.config";
import {ILoginName, ILoginRequest } from "../models/auth/login";

const checkAuth = (body: ILoginName) =>
  globalService.post(
    `${process.env.REACT_APP_AUTH_ENDPOINT}/check`,
    JSON.stringify(body)
  );

const csrfToken = () =>
  globalService.get(`${process.env.REACT_APP_AUTH_ENDPOINT}/csrf-token`);

const logIn = (body: ILoginRequest) =>
  globalService.post(
    `${process.env.REACT_APP_AUTH_ENDPOINT}/login`,
    JSON.stringify(body)
  );

const logOut = () =>
  globalService.delete(`${process.env.REACT_APP_AUTH_ENDPOINT}/logout`);

const setAxiosXSRFTokenHeader = (token: string) =>
  (globalService.defaults.headers["X-XSRF-TOKEN"] = token);
const setAxiosAuthTokenHeader = (token: string) =>
  (globalService.defaults.headers["X-Auth-Token"] = token);

export {
  checkAuth,
  csrfToken,
  setAxiosXSRFTokenHeader,
  setAxiosAuthTokenHeader,
  logIn,
  logOut,
};
