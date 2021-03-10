import { createDomain } from "effector";
import {persist} from "effector-storage/local";
import {IKeyValue} from "infrastructure/types";

export interface IUser {
  id: string;
  availableRoles: IKeyValue[];
  company: IKeyValue;
  userRole: IKeyValue;
  username: string;
  login: string;
  avatar?: string;
}

export const userDomain = createDomain("User");

export const updateCompanyUser = userDomain.event<IKeyValue>();
export const clearUser = userDomain.event<boolean>();

export const getUserFx = userDomain.effect<void, IUser | null>();

export const $user = userDomain.store<IUser | null>(null);
persist({ store: $user, key: "user" });
