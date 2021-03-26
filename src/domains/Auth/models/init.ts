import { $formIsChanged, $loginError, $loginPending, changeForm } from "./";
import { catchError, loginFx } from "infrastructure/models/auth/login";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: string | null, payload: string) => payload;

$loginError.on(catchError, failReducer).reset(changeForm);
$loginPending
  .on(loginFx.pending, pendingReducer)
  .reset(changeForm)
  .reset($loginError);

$formIsChanged.on(loginFx, () => false);
