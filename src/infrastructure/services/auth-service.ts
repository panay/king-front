import { globalService } from "../config/axios.config";
import { ILoginRequest } from "../models/auth/login";

globalService.defaults.baseURL = process.env.REACT_APP_AUTH_ENDPOINT!.toString();

const logIn = (body: ILoginRequest) =>
  globalService.post("/login", JSON.stringify(body));

const logOut = () => globalService.delete("/logout");

export { logIn, logOut };
