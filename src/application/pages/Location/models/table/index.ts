import { createDomain, restore } from "effector";
import {
  ILocationData,
  ILocationRequest,
  ILocationResponse,
} from "../../types/LocationData";
import { ISorting } from "infrastructure/types/Sorting";

const locationsTableDomain = createDomain("LocationsTable");

export const getLocationsFx = locationsTableDomain.effect<
  ILocationRequest,
  ILocationResponse
>();

export const updateLocationsFx = locationsTableDomain.effect<
  ILocationRequest,
  ILocationResponse
>();

export const changeLocations = locationsTableDomain.event<boolean>();
export const changeLocationsSorting = locationsTableDomain.event<ISorting>();
export const getLocationsList = locationsTableDomain.event<ILocationRequest>();
export const updateLocationListSuccess = locationsTableDomain.event<void>();

export const $rowData = locationsTableDomain.store<ILocationData[]>([]);
export const $rowCount = locationsTableDomain.store<number>(0);
export const $locationsIsChanged = restore<boolean>(changeLocations, false);
export const $locationsSorting = restore<ISorting>(changeLocationsSorting, {
  sort_field: "name",
  asc_sort: true,
});
