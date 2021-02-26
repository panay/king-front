import { globalService } from "../config/axios.config";

const getUserInfo = () => globalService.get(`${process.env.REACT_APP_USERS_ENDPOINT}/user_info`);

export { getUserInfo };
