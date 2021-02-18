import { globalService } from "infrastructure/config/axios.config";

globalService.defaults.baseURL = process.env.REACT_APP_USERS_ENDPOINT!.toString();

const getUserList = () => globalService.get("/list");
const createUser = (body: unknown) =>
  globalService.post("/users", JSON.stringify(body));
const updateUser = (id: string) => globalService.put(`/users?id=${id}`);
const deleteUser = (id: string) => globalService.delete(`/users?id=${id}`);

export { getUserList, createUser, updateUser, deleteUser };
