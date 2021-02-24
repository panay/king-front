import { createDomain } from "effector";
import {persist} from "effector-storage/local";
import {AxiosError} from "axios";
import {IKeyValue} from "../../../types/key-value.interface";

export interface IUser {
  id: string;
  availableRoles: IKeyValue[];
  company: IKeyValue;
  userRole: IKeyValue;
  username: string;
  avatar?: string;
}

export const userDomain = createDomain("User");

//todo ивент на обновление компании авторизованного юзера


export const getUserFx = userDomain.effect<void, IUser, AxiosError>();

export const $user = userDomain.store<IUser>({} as IUser);
persist({ store: $user, key: "user" });
