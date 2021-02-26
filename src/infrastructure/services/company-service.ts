import { globalService } from "../config/axios.config";

const getCompanies = () =>
  globalService.get(`${process.env.REACT_APP_COMPANY_ENDPOINT}/list`);
const createNewCompany = (name: string) =>
  globalService.post(`${process.env.REACT_APP_COMPANY_ENDPOINT}`, { name });

export { getCompanies, createNewCompany };
