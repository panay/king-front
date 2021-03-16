import axios from "axios";
import { $authenticated } from "../models/auth/login";

const globalService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

globalService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log(403);
      $authenticated.reset();
    }
    return Promise.reject(error);
  }
);

export { globalService };
