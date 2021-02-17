import { createDomain, hydrate } from "effector";

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
export const getUserFx = userDomain.effect<string, IUser, Error>();

export const $user = userDomain.store<IUser>({} as IUser);

hydrate(userDomain, {
  values: {
    $user,
  },
});
