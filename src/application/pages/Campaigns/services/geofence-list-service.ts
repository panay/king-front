import { globalService } from "infrastructure/config/axios.config";
import { IGeofenceListRequest } from "../types/GeofenceList";

const getGeofenceList = ({
  company_id,
  location_id,
  name,
}: IGeofenceListRequest) =>
  globalService.get(
    `${
      process.env.REACT_APP_GEOFENCE_ENDPOINT
    }/list/simple?company_id=${company_id}&location_id=${
      location_id || ""
    }&name=${name || ""}`
  );

export { getGeofenceList };
