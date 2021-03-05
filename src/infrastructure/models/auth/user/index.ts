import { createDomain } from "effector";
import {persist} from "effector-storage/local";
import {AxiosError} from "axios";
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

export const getUserFx = userDomain.effect<void, IUser, AxiosError>();

export const $user = userDomain.store<IUser>({} as IUser);
persist({ store: $user, key: "user" });
