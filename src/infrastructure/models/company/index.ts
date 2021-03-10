import {createDomain, restore} from "effector";
import {IKeyValue} from "infrastructure/types";

export const companyDomain = createDomain("Company");

export const getCompaniesFx = companyDomain.effect<void, IKeyValue[]>();
export const createNewCompanyFx = companyDomain.effect<string, string>();

export const changeForm = companyDomain.event<boolean>();
export const catchError = companyDomain.event<boolean>();

export const $formIsChanged = restore<boolean>(changeForm, true);
export const $companyError = companyDomain.store<boolean>(false);
export const $companyPending = companyDomain.store<boolean>(false);

export const $companies = companyDomain.store<IKeyValue[]>([]);
