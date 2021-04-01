import { getUserList } from "../../services/users-service";
import { IUserData, IUsersRequest, IUsersResponse } from "../../types/UserData";
import {
  $rowCount,
  $rowData,
  $usersIsChanged,
  updateUserListSuccess,
  getUsersFx,
  getUsersList,
  searchUsersByName,
  updateUsersFx,
} from "./";
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

getUsersList.watch((body) => getUsersFx(body));
searchUsersByName.watch((body) => updateUsersFx(body));
updateUserListSuccess.watch(() => {
  setPaging({
    isNextPageLoading: false,
    hasNextPage: true,
  });
});

$rowData
  .on(getUsersFx.doneData, usersReducer)
  .on(updateUsersFx.doneData, updateUsersReducer)
  .on(updateUserListSuccess, () => []);
$rowCount
  .on(getUsersFx.doneData, countReducer)
  .on(updateUsersFx.doneData, countReducer)
  .on(updateUserListSuccess, () => 0);
$usersIsChanged
  .on(getUsersFx.doneData, () => true)
  .on(updateUsersFx.doneData, () => true);

getUsersFx.use(getUsers);
updateUsersFx.use(getUsers);
