import {
  $companies,
  $companyError,
  $companyPending,
  $formIsChanged,
  catchError,
  changeForm,
  createNewCompanyFx,
  getCompaniesFx,
  getCompaniesList,
} from "./";
import { IKeyValue } from "infrastructure/types";
import {
  createNewCompany,
  getCompanies,
} from "infrastructure/services/company-service";
import { forward } from "effector";

const companiesReducer = (state: IKeyValue[], payload: IKeyValue[]) =>
  payload ? payload.slice() : [];
const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: boolean, payload: boolean) => payload;

const getCompanyList = async () => {
  let response = null;
  try {
    response = await getCompanies();
  } catch (err) {
    console.log(err.maessage);
  }

  return response?.data?.data;
};

const createCompany = async (name: string) => {
  let response = null;
  try {
    response = await createNewCompany(name);
  } catch (err) {
    catchError(true);
  }

  return response?.data;
};

getCompaniesList.watch(_ => getCompaniesFx)

$companies.on(getCompaniesFx.doneData, companiesReducer);

$companyError.on(catchError, failReducer).reset(changeForm);
$companyPending.on(createNewCompanyFx.pending, pendingReducer);

getCompaniesFx.use(getCompanyList);
createNewCompanyFx.use(createCompany);

$formIsChanged.on(createNewCompanyFx, () => false);

forward({
  from: createNewCompanyFx.doneData,
  to: getCompaniesFx,
});
