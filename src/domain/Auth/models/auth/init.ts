import { $authToken, ILoginRequest, submitFx } from "./";
import {logIn} from "../../services/auth-service";

const reducer = (state: string, payload: string) => payload;
const login = async (body: ILoginRequest) => {
  const response = await logIn(body)

  return response.data && response.data.access_token;
};

$authToken.on(submitFx.doneData, reducer);

submitFx.use(login);
