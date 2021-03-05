import { createDomain } from "effector";
import { persist } from "effector-storage/local";
import { AxiosError } from "axios";

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginName {
  login: string;
}

const authDomain = createDomain("Auth");

export const csrfTokenFx = authDomain.effect<void, void, AxiosError>();
export const loginFx = authDomain.effect<ILoginRequest, boolean, AxiosError>();
export const logoutFx = authDomain.effect<void, boolean, AxiosError>();
export const checkAuthFx = authDomain.effect<ILoginName, boolean, AxiosError>();

export const $authenticated = authDomain.store<boolean>(false);
persist({ store: $authenticated, key: "authenticated" });
