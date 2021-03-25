import { createDomain, restore } from "effector";
import { IUserData } from "../../types/UserData";
import { IKeyValue } from "infrastructure/types";

const userDomain = createDomain("UserForm");

export const changeForm = userDomain.event<boolean>();
export const catchError = userDomain.event<string | null>();
export const getAllRoles = userDomain.event<void>();
export const resetUserData = userDomain.event<void>();
export const deleteUserForm = userDomain.event<string>();
export const resetErrorForm = userDomain.event<void>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const getUserDataFx = userDomain.effect<
  IUserData | null,
  IUserData | null
>();
export const createUserFx = userDomain.effect<IUserData, boolean>();
export const updateUserFx = userDomain.effect<IUserData, boolean>();
export const deleteUserFx = userDomain.effect<string, string>();
export const getRolesFx = userDomain.effect<void, IKeyValue[]>();

export const $userError = userDomain.store<string | null>(null);
export const $userPending = userDomain.store<boolean>(false);
export const $roles = userDomain.store<IKeyValue[]>([]);
export const $userData = userDomain.store<IUserData | null>(null);
