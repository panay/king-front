import {
  $rowCount,
  $rowData,
  updateLocationListSuccess,
  getLocationsFx,
  getLocationsList,
  searchLocationsByName,
  updateLocationsFx,
} from "./";
import { setPaging } from "infrastructure/models/paging";
import {
  ILocationData,
  ILocationRequest,
  ILocationResponse,
} from "../../types/LocationData";
import { getLocationList } from "../../services/location-service";

const locationListReducer = (
  state: ILocationData[],
  payload: ILocationResponse
) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];
  const result = !rowData.length ? [] : state.concat(...rowData);

  setPaging({
    isNextPageLoading: false,
    hasNextPage: result.length < payload.rowCount,
  });

  return result;
};

const updateLocationsReducer = (
  state: ILocationData[],
  payload: ILocationResponse
) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];

  setPaging({
    isNextPageLoading: false,
    hasNextPage: rowData.length < payload.rowCount,
  });

  return rowData;
};

const countReducer = (state: number, payload: ILocationResponse) => {
  return payload ? payload.rowCount : 0;
};

const getLocations = async (request: ILocationRequest) => {
  let response = null;
  try {
    response = await getLocationList(request);
  } catch (err) {}

  return response?.data || [];
};

getLocationsList.watch((body) => getLocationsFx(body));
searchLocationsByName.watch((body) => updateLocationsFx(body));
updateLocationListSuccess.watch(() => {
  setPaging({
    isNextPageLoading: false,
    hasNextPage: true,
  });
});

$rowData
  .on(getLocationsFx.doneData, locationListReducer)
  .on(updateLocationsFx.doneData, updateLocationsReducer)
  .on(updateLocationListSuccess, () => []);
$rowCount
  .on(getLocationsFx.doneData, countReducer)
  .on(updateLocationsFx.doneData, countReducer)
  .on(updateLocationListSuccess, () => 0);

getLocationsFx.use(getLocations);
updateLocationsFx.use(getLocations);
