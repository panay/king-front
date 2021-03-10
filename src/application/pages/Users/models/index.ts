import {createDomain, restore} from "effector";
import { IFormUser } from "../types/UserForm";

const usersDomain = createDomain("Users");

export const changeForm = usersDomain.event<boolean>();
export const catchError = usersDomain.event<string>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const createUserFx = usersDomain.effect<IFormUser, boolean>();

export const $usersError = usersDomain.store<string | null>(null);
export const $usersPending = usersDomain.store<boolean>(false);
