import axios from "axios";
import { ILoginRequest } from "domain/Auth/models/auth";
import "infrastructure/config/axios.config";

const authService = axios.create({
  baseURL: process.env.REACT_APP_AUTH_ENDPOINT!.toString(),
});

const logIn = (body: ILoginRequest) =>
  authService.post("/login", JSON.stringify(body));

export { logIn };
