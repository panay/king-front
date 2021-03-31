import { createDomain } from "effector";
import { persist } from "effector-storage/local";
import { IKeyValue } from "infrastructure/types";

export interface IUser {
  id: string;
  company: IKeyValue;
  role: {
    id: string;
    name: string;
    description: string;
  };
  username: string;
  login: string;
  isRootAdmin?: boolean;
}

export const userDomain = createDomain("User");

export const updateCurrentCompany = userDomain.event<IKeyValue>();
export const clearUser = userDomain.event<boolean>();

export const $user = userDomain.store<IUser | null>(null);
export const $currentCompany = userDomain.store<IKeyValue | null>(null);
persist({ store: $user, key: "user" });
persist({ store: $currentCompany, key: "currentCompany" });
