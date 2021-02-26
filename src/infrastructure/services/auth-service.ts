import { globalService } from "../config/axios.config";
import { ILoginRequest } from "../models/auth/login";

const logIn = (body: ILoginRequest) =>
  globalService.post(
    `${process.env.REACT_APP_AUTH_ENDPOINT}/login`,
    JSON.stringify(body)
  );

const logOut = () =>
  globalService.delete(`${process.env.REACT_APP_AUTH_ENDPOINT}/logout`);

export { logIn, logOut };
