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

export const catchError = authDomain.event<string>();

export const $authenticated = authDomain.store<boolean>(false);
persist({ store: $authenticated, key: "authenticated" });
