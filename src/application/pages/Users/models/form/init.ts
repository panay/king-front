import {
  $formIsChanged,
  $roles,
  $userData,
  $userError,
  $userPending,
  catchError,
  changeForm,
  createUserFx,
  deleteUserForm,
  deleteUserFx,
  getAllRoles,
  getRolesFx,
  getUserDataFx,
  resetUserData,
  updateUserFx,
} from "./";
import { IKeyValue } from "infrastructure/types";
import {
  createUser,
  deleteUser,
  getRoles,
  updateUser,
} from "../../services/users-service";
import { IUserData } from "../../types/UserData";
import "infrastructure/models/paging/init";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: string | null, payload: string) => payload;
const rolesReducer = (state: IKeyValue[], payload: IKeyValue[]) =>
  payload ? payload.slice() : [];
const userDataReducer = (state: IUserData | null, payload: IUserData | null) =>
  payload ? { ...payload } : null;

const getUsersRoles = async () => {
  let response = null;
  try {
    response = await getRoles();
  } catch (err) {
    return null;
  }

  return response?.data || [];
};

const deleteCurrentUser = async (id: string) => {
  let response = null;
  try {
    response = await deleteUser(id);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
    return null;
  }

  return response?.data;
};

const createNewUser = async (user: IUserData) => {
  let response = null;
  try {
    response = await createUser(user);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
    return null;
  }

  return response?.data || [];
};

const updateCurrentUser = async (user: IUserData) => {
  let response = null;
  try {
    response = await updateUser(user);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
    return null;
  }

  return response?.data || [];
};

getAllRoles.watch(getRolesFx);
resetUserData.watch(() => getUserDataFx(null));
deleteUserForm.watch((id) => deleteUserFx(id));

$userError.on(catchError, failReducer).reset(changeForm);
$userPending
  .on(createUserFx.pending || deleteUserFx.pending, pendingReducer)
  .reset(changeForm)
  .reset($userError);

$formIsChanged.on(createUserFx || deleteUserFx, () => false);
$roles.on(getRolesFx.doneData, rolesReducer);
$userData.on(getUserDataFx, userDataReducer);

createUserFx.use(createNewUser);
updateUserFx.use(updateCurrentUser);
getRolesFx.use(getUsersRoles);
deleteUserFx.use(deleteCurrentUser);
