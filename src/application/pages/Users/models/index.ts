import {createDomain, restore} from "effector";
import {AxiosError} from "axios";
import { IFormUser } from "../types/UserForm";

const usersDomain = createDomain("Users");

export const changeForm = usersDomain.event<boolean>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const createUserFx = usersDomain.effect<IFormUser, boolean, AxiosError>();

export const $usersError = usersDomain.store<AxiosError>({} as AxiosError);
export const $usersPending = usersDomain.store<boolean>(false);
