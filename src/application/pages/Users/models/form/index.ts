import {createDomain, restore} from "effector";
import { IUserData } from "../../types/UserData";

const usersDomain = createDomain("UserForm");

export const changeForm = usersDomain.event<boolean>();
export const catchError = usersDomain.event<string>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const createUserFx = usersDomain.effect<IUserData, boolean>();

export const $usersError = usersDomain.store<string | null>(null);
export const $usersPending = usersDomain.store<boolean>(false);
