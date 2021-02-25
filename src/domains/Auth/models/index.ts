import {createDomain, restore} from "effector";
import {AxiosError} from "axios";

const authDomain = createDomain("AuthForm");

export const changeForm = authDomain.event<boolean>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const $loginError = authDomain.store<AxiosError>({} as AxiosError);
export const $loginPending = authDomain.store<boolean>(false);
