import { getUserList } from "../../services/users-service";
import { IUserData, IUsersRequest, IUsersResponse } from "../../types/UserData";
import { $rowCount, $rowData, getUsersFx, updateUsersFx, getUsersList } from "./";
import { setPaging } from "infrastructure/models/paging";
import "../init";

const usersReducer = (state: IUserData[], payload: IUsersResponse) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];
  const result = !rowData.length ? [] : state.concat(...rowData);

  setPaging({
    isNextPageLoading: false,
    hasNextPage: result.length < payload.rowCount,
  });

  return result;
};

const updateUsersReducer = (state: IUserData[], payload: IUsersResponse) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];

  setPaging({
    isNextPageLoading: false,
    hasNextPage: rowData.length < payload.rowCount,
  });

  return rowData;
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

getUsersList.watch(body => getUsersFx(body));

$rowData
  .on(getUsersFx.doneData, usersReducer)
  .on(updateUsersFx.doneData, updateUsersReducer);
$rowCount.on(getUsersFx.doneData, countReducer);

getUsersFx.use(getUsers);
updateUsersFx.use(getUsers);
