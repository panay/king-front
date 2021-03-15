import { sample } from "effector";
import { getUserList } from "../../services/users-service";
import { IUserData, IUsersRequest, IUsersResponse } from "../../types/UserData";
import { $rowCount, $rowData, getUsersFx } from "./";
import { $user } from "infrastructure/models/auth/user";
import { setPaging } from "infrastructure/models/paging";

const usersReducer = (state: IUserData[], payload: IUsersResponse) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];
  const result = !rowData.length ? [] : state.concat(...rowData);

  setPaging({
    isNextPageLoading: false,
    hasNextPage: result.length < payload.rowCount,
  });

  return result;
};

const countReducer = (state: number, payload: IUsersResponse) => {
  return payload ? payload.rowCount : 0;
};

const getUsers = async (request: IUsersRequest) => {
  let response = null;
  try {
    response = await getUserList(request);
  } catch (err) {}

  return response?.data || [];
};

$rowData.on(getUsersFx.doneData, usersReducer);
$rowCount.on(getUsersFx.doneData, countReducer);

getUsersFx.use(getUsers);

sample({
  clock: $user,
  fn: (user) => ({ company_id: user?.company.id } as IUsersRequest),
  target: getUsersFx,
});
