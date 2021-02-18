import { $authenticated, ILoginRequest, logoutFx, submitFx } from "./";
import { logIn, logOut } from "../../../services/auth-service";

const reducer = (state: boolean, payload: boolean) => payload;
const login = async (body: ILoginRequest) => {
  let authenticated: boolean = true;
  let response;
  try {
    response = await logIn(body);
    authenticated = !!response.headers["Set-Cookie"];
  } catch (error) {
    console.log("LogIn ERROR  :: ", error);
  }

  return authenticated;
};

const logout = async () => {
  let authenticated = true;
  try {
    await logOut();
    authenticated = false;
  } catch (error) {
    console.log("LogIn Error :: ", error);
  }

  return authenticated;
};

$authenticated.on(submitFx.doneData, reducer).on(logoutFx.doneData, reducer);

submitFx.use(login);
logoutFx.use(logout);
