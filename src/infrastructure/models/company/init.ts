import { $companies, createNewCompanyFx, getCompaniesFx } from "./";
import { IKeyValue } from "infrastructure/types";
import {
  createNewCompany,
  getCompanies,
} from "infrastructure/services/company-service";
import {forward, sample} from "effector";

const companiesReducer = (state: IKeyValue[], payload: IKeyValue[]) =>
  payload ? payload.slice() : [];

const getCompanyList = async () => {
  const response = await getCompanies();

  return response.data?.data;
};

const createCompany = async (name: string) => {
  const response = await createNewCompany(name);

  return response.data;
};

$companies.on(getCompaniesFx.doneData, companiesReducer);

getCompaniesFx.use(getCompanyList);
createNewCompanyFx.use(createCompany);

forward({
  from: createNewCompanyFx.doneData,
  to: getCompaniesFx,
});
