import {
  $formIsChanged,
  $roles,
  $userData,
  $usersError,
  $usersPending,
  catchError,
  changeForm,
  createUserFx,
  deleteUserForm,
  deleteUserFx,
  getAllRoles,
  getRolesFx,
  getUserDataFx,
  resetUserData,
} from "./";
import { IKeyValue } from "infrastructure/types";
import { createUser, deleteUser, getRoles } from "../../services/users-service";
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
  } catch (err) {}

  return response?.data || [];
};

const deleteCurrentUser = async (id: string) => {
  let response = null;
  try {
    response = await deleteUser(id);
  } catch (err) {}

  return response?.data;
};

const createNewUser = async (user: IUserData) => {
  let response = null;
  try {
    response = await createUser(user);
  } catch (err) {}

  return response?.data || [];
};

getAllRoles.watch(getRolesFx);
resetUserData.watch(() => getUserDataFx(null));
deleteUserForm.watch((id) => deleteUserFx(id));

$usersError.on(catchError, failReducer).reset(changeForm);
$usersPending
  .on(createUserFx.pending || deleteUserFx.pending, pendingReducer)
  .reset(changeForm);

$formIsChanged.on(createUserFx || deleteUserFx, () => false);
$roles.on(getRolesFx.doneData, rolesReducer);
$userData.on(getUserDataFx, userDataReducer);

createUserFx.use(createNewUser);
getRolesFx.use(getUsersRoles);
deleteUserFx.use(deleteCurrentUser);
