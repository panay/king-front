import { createDomain } from "effector";
import { persist } from "effector-storage/local";

export interface ILoginRequest {
  email: string;
  pass: string;
}

export const authDomain = createDomain("Auth");

export const submitFx = authDomain.effect<ILoginRequest, boolean, Error>();
export const logoutFx = authDomain.effect<void, boolean, Error>();

export const $authenticated = authDomain.store<boolean>(false);
persist({ store: $authenticated, key: "authenticated" });
