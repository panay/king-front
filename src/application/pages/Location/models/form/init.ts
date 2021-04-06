import {
  $formIsChanged,
  $locationData,
  $locationError,
  $locationPending,
  catchError,
  changeForm,
  createLocationFx,
  deleteLocationFx,
  getLocationDataFx,
  resetErrorForm,
  resetLocationData,
  updateLocationFx,
} from "./";
import "infrastructure/models/paging/init";
import {
  createLocation,
  deleteLocation,
  updateLocation,
} from "../../services/location-service";
import { ILocationData } from "../../types/LocationData";
import { IKeyValue } from "infrastructure/types";

const pendingReducer = (state: boolean, payload: boolean) => payload;
const failReducer = (state: string | null, payload: string | null) => payload;
const locationDataReducer = (
  state: IKeyValue | null,
  payload: IKeyValue | null
) => (payload ? { ...payload } : null);

const deleteCurrentLocation = async (id: string) => {
  let response = null;
  try {
    response = await deleteLocation(id);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

const createNewLocation = async (location: ILocationData) => {
  let response = null;
  try {
    response = await createLocation(location);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

const updateCurrentLocation = async (location: ILocationData) => {
  let response = null;
  try {
    response = await updateLocation(location);
  } catch (err) {
    catchError(
      err.response && err.response.data
        ? err.response.data.message
        : "Ошибка сервера"
    );
  }

  return response?.status === 200;
};

resetLocationData.watch(() => getLocationDataFx(null));
resetErrorForm.watch(() => catchError(null));

$locationError.on(catchError, failReducer).reset(changeForm);
$locationPending
  .on(createLocationFx.pending, pendingReducer)
  .on(updateLocationFx.pending, pendingReducer)
  .on(deleteLocationFx.pending, pendingReducer)
  .reset(changeForm)
  .reset($locationError);

$formIsChanged
  .on(createLocationFx, () => false)
  .on(updateLocationFx, () => false)
  .on(deleteLocationFx, () => false);

$locationData.on(getLocationDataFx, locationDataReducer);

createLocationFx.use(createNewLocation);
updateLocationFx.use(updateCurrentLocation);
deleteLocationFx.use(deleteCurrentLocation);
