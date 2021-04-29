import {
  $rowCount,
  $rowData,
  updateLocationListSuccess,
  getLocationsFx,
  getLocationsList,
  updateLocationsFx,
} from "./";
import { setPaging } from "infrastructure/models/paging";
import { IKeyValue } from "infrastructure/types";
import {
  ILocationListRequest,
  ILocationListResponse,
} from "../../types/LocationList";
import { getLocationList } from "../../services/location-list-service";

const locationListReducer = (
  state: IKeyValue[],
  payload: ILocationListResponse
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
  state: IKeyValue[],
  payload: ILocationListResponse
) => {
  const rowData = payload && payload.data ? payload.data.slice() : [];

  setPaging({
    isNextPageLoading: false,
    hasNextPage: rowData.length < payload.rowCount,
  });

  return rowData;
};

const countReducer = (state: number, payload: ILocationListResponse) => {
  return payload ? payload.rowCount : 0;
};

const getLocations = async (request: ILocationListRequest) => {
  let response = null;
  try {
    response = await getLocationList(request);
  } catch (err) {}

  return response?.data || [];
};

getLocationsList.watch((body) => getLocationsFx(body));
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
