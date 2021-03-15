import { globalService } from "infrastructure/config/axios.config";
import { IUsersRequest } from "../types/UserData";

const getUserList = ({
  company_id,
  page_number = 1,
  row_count = 50,
}: IUsersRequest) =>
  globalService.get(
    `${process.env.REACT_APP_USERS_ENDPOINT}/list?company_id=${company_id}&page_number=${page_number}&row_count=${row_count}`
  );
const createUser = (body: unknown) =>
  globalService.post(
    `${process.env.REACT_APP_USERS_ENDPOINT}`,
    JSON.stringify(body)
  );
const updateUser = (id: string) =>
  globalService.put(`${process.env.REACT_APP_USERS_ENDPOINT}?id=${id}`);
const deleteUser = (id: string) =>
  globalService.delete(`${process.env.REACT_APP_USERS_ENDPOINT}?id=${id}`);

export { getUserList, createUser, updateUser, deleteUser };
