import { createDomain } from "effector";
import {AxiosError} from "axios";
import {IKeyValue} from "infrastructure/types";

export const companyDomain = createDomain("Company");

export const getCompaniesFx = companyDomain.effect<void, IKeyValue[], AxiosError>();
export const createNewCompanyFx = companyDomain.effect<string, string, AxiosError>();

export const $companies = companyDomain.store<IKeyValue[]>([
    {
        id: "kfc",
        name: "KFC"
    },
    {
        id: "burgerking",
        name: "Burger King"
    },
    {
        id: "macdonalds",
        name: "MacDonald's"
    },
    {
        id: "potato",
        name: "Крошка Картошка"
    },
    {
        id: "coffeelike",
        name: "Coffee Like"
    }
]);
