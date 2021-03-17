import {createDomain, restore} from "effector";
import { IUserData } from "../../types/UserData";
import {IKeyValue} from "infrastructure/types";

const usersDomain = createDomain("UserForm");

export const changeForm = usersDomain.event<boolean>();
export const catchError = usersDomain.event<string>();
export const getAllRoles = usersDomain.event<void>();
export const resetUserData = usersDomain.event<void>();
export const deleteUserForm = usersDomain.event<string>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const getUserDataFx = usersDomain.effect<IUserData | null, IUserData | null>();
export const createUserFx = usersDomain.effect<IUserData, boolean>();
export const deleteUserFx = usersDomain.effect<string, string>();
export const getRolesFx = usersDomain.effect<void, IKeyValue[]>();

export const $usersError = usersDomain.store<string | null>(null);
export const $usersPending = usersDomain.store<boolean>(false);
export const $roles = usersDomain.store<IKeyValue[]>([]);
export const $userData = usersDomain.store<IUserData | null>(null);
