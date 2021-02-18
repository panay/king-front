import axios from "axios";
import "infrastructure/config/axios.config";

const authService = axios.create({
  baseURL: process.env.REACT_APP_USER_ENDPOINT!.toString(),
});

const getUserInfo = (token: string) =>
  authService.get("/user_info", {
    headers: {
      Authorization: token,
    },
  });

const getUserList = (token: string) =>
  authService.get("/list", {
    headers: {
      Authorization: token,
    },
  });

const createUser = (token: string, body: unknown) =>
  authService.post("/users", JSON.stringify(body), {
    headers: {
      Authorization: token,
    },
  });

const updateUser = (token: string, id: string) =>
  authService.put(`/users?id=${id}`, {
    headers: {
      Authorization: token,
    },
  });

const deleteUser = (token: string, id: string) =>
  authService.delete(`/users?id=${id}`, {
    headers: {
      Authorization: token,
    },
  });

export { getUserInfo, getUserList, createUser, updateUser, deleteUser };
