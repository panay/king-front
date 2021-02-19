import { createDomain } from "effector";
import {persist} from "effector-storage/local";

interface IKeyValue {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  availableRoles: IKeyValue[];
  company: IKeyValue;
  userRole: IKeyValue;
}

export const userDomain = createDomain("User");

export const getUserFx = userDomain.effect<void, IUser, Error>();

export const $user = userDomain.store<IUser>({} as IUser);
persist({ store: $user, key: "user" });