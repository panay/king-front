import { createDomain, restore } from "effector";
import {
  ILocationData,
  ILocationRequest,
  ILocationResponse,
} from "../../types/LocationData";

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
export const getLocationsList = locationsTableDomain.event<ILocationRequest>();
export const searchLocationsByName = locationsTableDomain.event<ILocationRequest>();
export const updateLocationListSuccess = locationsTableDomain.event<void>();

export const $rowData = locationsTableDomain.store<ILocationData[]>([]);
export const $rowCount = locationsTableDomain.store<number>(0);
export const $locationsIsChanged = restore<boolean>(changeLocations, false);
