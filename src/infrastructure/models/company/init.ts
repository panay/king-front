import { $companies, createNewCompanyFx, getCompaniesFx } from "./";
import { IKeyValue } from "infrastructure/types";
import {
  createNewCompany,
  getCompanies,
} from "infrastructure/services/company-service";

const companiesReducer = (state: IKeyValue[], payload: IKeyValue[]) => {
  const companies = payload ? payload.slice() : [];
  return {
    ...state,
    ...companies,
  };
};

const getCompanyList = async () => {
  const response = await getCompanies();

  return response.data;
};

const createCompany = async (name: string) => {
  const response = await createNewCompany(name);

  return response.data;
};

$companies.on(getCompaniesFx.doneData, companiesReducer);

getCompaniesFx.use(getCompanyList);
createNewCompanyFx.use(createCompany);
