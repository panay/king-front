import { $rowData, getGeofencesFx, getGeofencesList } from "./";
import { IKeyValue } from "infrastructure/types";
import { IGeofenceListRequest } from "../../types/GeofenceList";
import { getGeofenceList } from "../../services/geofence-list-service";

const geofenceListReducer = (state: IKeyValue[], payload: IKeyValue[]) =>
  payload ? payload.slice() : [];

const getGeofences = async (request: IGeofenceListRequest) => {
  let response = null;
  try {
    response = await getGeofenceList(request);
  } catch (err) {}

  return response?.data || [];
};

getGeofencesList.watch((body) => getGeofencesFx(body));

$rowData.on(getGeofencesFx.doneData, geofenceListReducer);

getGeofencesFx.use(getGeofences);
