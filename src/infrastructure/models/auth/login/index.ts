import { createDomain } from "effector";
import { persist } from "effector-storage/local";

export interface ILoginRequest {
  login: string;
  password: string;
}

const authDomain = createDomain("Auth");

export const loginFx = authDomain.effect<ILoginRequest, boolean>();
export const logoutFx = authDomain.effect<void, boolean>();
export const checkAuthFx = authDomain.effect<string, boolean>();

export const checkUserAuth = authDomain.event<string>();
export const submitLogin = authDomain.event<ILoginRequest>();
export const signOut = authDomain.event<void>();

export const catchError = authDomain.event<string>();
export const loginSuccess = authDomain.event<boolean>();

export const $checkedAuth = authDomain.store<boolean>(false);
export const $afterLogin = authDomain.store<boolean>(false);
export const $authenticated = authDomain.store<boolean>(false);
persist({ store: $authenticated, key: "authenticated" });
