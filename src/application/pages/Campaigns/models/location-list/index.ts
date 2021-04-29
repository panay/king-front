import { createDomain } from "effector";
import {
  ILocationListRequest,
  ILocationListResponse,
} from "../../types/LocationList";
import { IKeyValue } from "infrastructure/types";

const locationsListDomain = createDomain("LocationsList");

export const getLocationsFx = locationsListDomain.effect<
  ILocationListRequest,
  ILocationListResponse
>();

export const updateLocationsFx = locationsListDomain.effect<
  ILocationListRequest,
  ILocationListResponse
>();

export const getLocationsList = locationsListDomain.event<ILocationListRequest>();
export const updateLocationListSuccess = locationsListDomain.event<void>();

export const $rowData = locationsListDomain.store<IKeyValue[]>([]);
export const $rowCount = locationsListDomain.store<number>(0);
