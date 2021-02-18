import { globalService } from "../config/axios.config";

globalService.defaults.baseURL = process.env.REACT_APP_USERS_ENDPOINT!.toString();

const getUserInfo = () => globalService.get("/user_info");

export { getUserInfo };
