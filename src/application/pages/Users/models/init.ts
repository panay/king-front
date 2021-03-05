import { $formIsChanged, $usersError, $usersPending, changeForm, createUserFx } from "./";
import { AxiosError } from "axios";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: AxiosError, payload: AxiosError) => {
  return {
    ...payload,
  };
};

$usersError.on(createUserFx.failData, failReducer).reset(changeForm);
$usersPending.on(createUserFx.pending, pendingReducer).reset(changeForm);

$formIsChanged.on(createUserFx, () => false);
