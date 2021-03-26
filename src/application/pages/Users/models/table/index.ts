import { createDomain } from "effector";
import { IUserData, IUsersRequest, IUsersResponse } from "../../types/UserData";

const usersTableDomain = createDomain("UsersTable");

export const getUsersFx = usersTableDomain.effect<
  IUsersRequest,
  IUsersResponse
>();

export const updateUsersFx = usersTableDomain.effect<
  IUsersRequest,
  IUsersResponse
>();

export const getUsersList = usersTableDomain.event<IUsersRequest>();
export const searchUsersByName = usersTableDomain.event<IUsersRequest>();
export const updateUserListSuccess = usersTableDomain.event<void>();

export const $rowData = usersTableDomain.store<IUserData[]>([]);
export const $rowCount = usersTableDomain.store<number>(0);
