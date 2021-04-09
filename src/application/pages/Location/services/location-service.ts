import { globalService } from "infrastructure/config/axios.config";
import { ILocationRequest } from "../types/LocationData";

const getLocationList = ({
  company_id,
  page_number = 1,
  row_count = 50,
  name,
  asc_sort = true,
  sort_field = "name",
}: ILocationRequest) =>
  globalService.get(
    `${
      process.env.REACT_APP_LOCATION_ENDPOINT
    }/list?company_id=${company_id}&page_number=${page_number}&row_count=${row_count}&asc_sort=${asc_sort}&sort_field=${sort_field}&name=${
      name || ""
    }`
  );
const createLocation = (body: unknown) =>
  globalService.post(
    `${process.env.REACT_APP_LOCATION_ENDPOINT}`,
    JSON.stringify(body)
  );
const updateLocation = (body: unknown) =>
  globalService.put(
    `${process.env.REACT_APP_LOCATION_ENDPOINT}`,
    JSON.stringify(body)
  );
const deleteLocation = (id: string) =>
  globalService.delete(`${process.env.REACT_APP_LOCATION_ENDPOINT}`, {
    data: { id },
  });

export { getLocationList, createLocation, updateLocation, deleteLocation };
