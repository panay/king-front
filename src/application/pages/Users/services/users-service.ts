import { globalService } from "infrastructure/config/axios.config";
import { IUsersRequest } from "../types/UserData";

const getUserList = ({
  company_id,
  page_number = 1,
  row_count = 50,
  name,
}: IUsersRequest) =>
  globalService.get(
    `${process.env.REACT_APP_USERS_ENDPOINT}/list?company_id=${company_id}&page_number=${page_number}&row_count=${row_count}&name=${name || ""}`
  );
const createUser = (body: unknown) =>
  globalService.post(
    `${process.env.REACT_APP_USERS_ENDPOINT}`,
    JSON.stringify(body)
  );
const updateUser = (body: unknown) =>
  globalService.put(
    `${process.env.REACT_APP_USERS_ENDPOINT}`,
    JSON.stringify(body)
  );
const deleteUser = (id: string) =>
  globalService.delete(`${process.env.REACT_APP_USERS_ENDPOINT}`, {
    data: { id },
  });
const getRoles = () =>
  globalService.get(`${process.env.REACT_APP_ROLE_ENDPOINT}/list`);

export { getUserList, createUser, updateUser, deleteUser, getRoles };
