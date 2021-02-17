import { $authToken, ILoginRequest, submitFx } from "./";
import axios from "axios";
import "../../../../infrastructure/config/axios.config";

const reducer = (state: string, payload: string) => payload;
const logIn = async (body: ILoginRequest) => {
  const response = await axios.post("auth", JSON.stringify(body));

  return response.data;
};

$authToken.on(submitFx.doneData, reducer);

submitFx.use(logIn);
