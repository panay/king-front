import {createDomain, restore} from "effector";

const authFormDomain = createDomain("AuthForm");

export const changeForm = authFormDomain.event<boolean>();
export const $formIsChanged = restore<boolean>(changeForm, true);

export const $loginError = authFormDomain.store<string|null>(null);
export const $loginPending = authFormDomain.store<boolean>(false);
