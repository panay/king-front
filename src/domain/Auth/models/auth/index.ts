import { createDomain, hydrate } from "effector";

export interface ILoginRequest {
  email: string;
  pass: string;
}

export const authDomain = createDomain("Auth");
export const submitFx = authDomain.effect<ILoginRequest, string, Error>();

export const $authToken = authDomain.store<string>("");

hydrate(authDomain, {
  values: {
    $authToken,
  },
});
