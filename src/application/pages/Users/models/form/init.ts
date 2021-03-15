import {$formIsChanged, $usersError, $usersPending, catchError, changeForm, createUserFx} from "./index";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: string | null, payload: string) => payload;

$usersError.on(catchError, failReducer).reset(changeForm);
$usersPending.on(createUserFx.pending, pendingReducer).reset(changeForm);

$formIsChanged.on(createUserFx, () => false);
