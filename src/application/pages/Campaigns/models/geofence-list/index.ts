import { createDomain } from "effector";
import { IKeyValue } from "infrastructure/types";
import { IGeofenceListRequest } from "../../types/GeofenceList";

const geofenceListDomain = createDomain("GeofenceList");

export const getGeofencesFx = geofenceListDomain.effect<
  IGeofenceListRequest,
  IKeyValue[]
>();

export const getGeofencesList = geofenceListDomain.event<IGeofenceListRequest>();

export const $rowData = geofenceListDomain.store<IKeyValue[]>([]);
