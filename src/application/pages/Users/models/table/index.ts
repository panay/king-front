import { createDomain, restore } from "effector";
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

export const changeUsers = usersTableDomain.event<boolean>();
export const getUsersList = usersTableDomain.event<IUsersRequest>();
export const updateUserListSuccess = usersTableDomain.event<void>();

export const $rowData = usersTableDomain.store<IUserData[]>([]);
export const $rowCount = usersTableDomain.store<number>(0);
export const $usersIsChanged = restore<boolean>(changeUsers, false);
