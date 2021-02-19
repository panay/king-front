import { $formIsChanged, $loginError, $loginPending, changeForm } from "./";
import { AxiosError } from "axios";
import { loginFx } from "infrastructure/models/auth/login";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: AxiosError, payload: AxiosError) => {
  return {
    ...payload,
  };
};

$loginError.on(loginFx.failData, failReducer).reset(changeForm);
$loginPending.on(loginFx.pending, pendingReducer).reset(changeForm);

$formIsChanged.on(loginFx, () => false);
