import { globalService } from "infrastructure/config/axios.config";

const getUserList = () => globalService.get(`${process.env.REACT_APP_USERS_ENDPOINT}/list`);
const createUser = (body: unknown) =>
  globalService.post(`${process.env.REACT_APP_USERS_ENDPOINT}`, JSON.stringify(body));
const updateUser = (id: string) => globalService.put(`${process.env.REACT_APP_USERS_ENDPOINT}?id=${id}`);
const deleteUser = (id: string) => globalService.delete(`${process.env.REACT_APP_USERS_ENDPOINT}?id=${id}`);

export { getUserList, createUser, updateUser, deleteUser };
